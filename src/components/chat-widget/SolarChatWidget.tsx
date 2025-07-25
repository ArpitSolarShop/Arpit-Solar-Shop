import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sun, Send, Shield, Phone, Building, Home, MapPin, Ruler, Lightbulb, Users, CheckCircle, Calendar, Mail, User, UserCheck, MessageCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserData {
  name?: string;
  phone?: string;
  email?: string;
  entityType?: 'home' | 'business';
  location?: string;
  roofArea?: 'small' | 'medium' | 'large' | 'xl';
  monthlyBill?: 'low' | 'mid' | 'high' | 'vip';
  referralSource?: 'online' | 'referral' | 'news' | 'other';
  referralName?: string;
  referralPhone?: string;
}

interface SolarResults {
  annualSavings: number;
  systemSize: string;
  subsidyAmount: number;
  totalSavings: number;
}

const steps = [
  {
    id: 'name',
    question: "Wonderful! To whom am I speaking? I'll use your name to personalize the savings report.",
    type: 'text',
    placeholder: 'Enter your full name (e.g., Priya Sharma)',
    validation: (value: string) => {
      if (!value.trim()) return 'Please enter your name';
      const testNames = ['test', 'mickey', 'donald', 'abc', 'xyz', '123'];
      if (testNames.some(name => value.toLowerCase().includes(name))) {
        return '😉 Hehe! While I love test names, I\'ll need your real name for the official savings report. Could you please share it?';
      }
      return null;
    }
  },
  {
    id: 'contact',
    question: "Thank you! How should we send your free solar savings report? We can send it instantly via WhatsApp.",
    type: 'contact',
    fields: ['phone', 'email']
  },
  {
    id: 'entityType',
    question: "Is this solar installation for your home or for a business/commercial property?",
    type: 'buttons',
    options: [
      { value: 'home', label: '🏠 Home (Individual)', icon: Home },
      { value: 'business', label: '🏢 Business (Enterprise/Commercial)', icon: Building }
    ]
  },
  {
    id: 'location',
    question: "📍 Where is your property located? (e.g., 'Varanasi, Uttar Pradesh'). This helps us check local solar policies and sunshine hours.",
    type: 'text',
    placeholder: 'Enter City, State',
    icon: MapPin
  },
  {
    id: 'roofArea',
    question: "📏 What's the approximate rooftop area you have available for panels? A rough estimate is perfectly fine.",
    type: 'buttons',
    options: [
      { value: 'small', label: 'Under 500 sq ft (Approx. 45 sq m)' },
      { value: 'medium', label: '500–1,000 sq ft (Approx. 45-90 sq m)' },
      { value: 'large', label: '1,000–2,000 sq ft (Approx. 90-185 sq m)' },
      { value: 'xl', label: 'Over 2,000 sq ft (Approx. 185+ sq m)' }
    ],
    icon: Ruler
  },
  {
    id: 'monthlyBill',
    question: "💡 And what's your average monthly electricity bill? This is the key to calculating your potential savings!",
    type: 'buttons',
    options: [
      { value: 'low', label: 'Less than ₹2,000' },
      { value: 'mid', label: '₹2,001 - ₹5,000' },
      { value: 'high', label: '₹5,001 - ₹10,000' },
      { value: 'vip', label: 'More than ₹10,000' }
    ],
    icon: Lightbulb
  },
  {
    id: 'referralSource',
    question: "👋 We're almost done! Just curious—how did you hear about Arpit Solar Shop?",
    type: 'buttons',
    options: [
      { value: 'online', label: 'Online (Google/Facebook)' },
      { value: 'referral', label: 'Friend/Family Referral' },
      { value: 'news', label: 'News/Advertisement' },
      { value: 'other', label: 'Other' }
    ],
    icon: Users
  },
  {
    id: 'referralContact',
    question: "Great! Could you please share their name and contact number?",
    type: 'referral_contact',
    fields: ['referralName', 'referralPhone']
  }
];

interface SolarChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolarChatWidget({ isOpen, onClose }: SolarChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [solarResults, setSolarResults] = useState<SolarResults | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-start conversation when component loads and modal is open
    if (isOpen && !isStarted && messages.length === 0) {
      setTimeout(() => {
        addMessage("👋 Hi there! Want to bring your electricity bill to nearly zero with solar? I'm Yami, your personal solar assistant.", false);
        addMessage("Let's calculate your exact savings and the government subsidy you can get in just a few quick steps! ⚡", false, 1500);
        
        setTimeout(() => {
          startCalculation();
        }, 3000);
      }, 1000);
    }
  }, [isOpen]);

  const addMessage = (content: string, isUser = false, delay = 0) => {
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        isUser,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }, delay);
  };

  const showTypingIndicator = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const startCalculation = () => {
    setIsStarted(true);
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    if (currentStep < steps.length) {
      showTypingIndicator();
      setTimeout(() => {
        const step = steps[currentStep];
        let question = step.question;
        
        // Special handling for contact step to use actual name
        if (step.id === 'contact' && userData.name) {
          question = `Thank you, ${userData.name}! How should we send your free solar savings report? We can send it instantly via WhatsApp.`;
        }
        
        addMessage(question, false);
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else {
      // All steps completed, submit data
      submitSolarLead();
    }
  };

  const submitSolarLead = async () => {
    addMessage("🎉 Amazing! Let me calculate your personalized solar savings...", false);
    
    try {
      const insertData = {
        name: userData.name || '',
        phone: userData.phone || '',
        email: userData.email || null,
        entity_type: userData.entityType === 'home' ? 'Individual' as const : 'Enterprise' as const,
        solution_classification: userData.entityType === 'home' ? 'Residential' as const : 'Commercial' as const,
        project_location: userData.location || null,
        referral_name: userData.referralName || null,
        referral_phone: userData.referralPhone || null,
        source: "AI Chatbot" as const,
      };

      const { error } = await supabase.from("quotes").insert(insertData);

      if (error) throw error;

      // Calculate mock results based on user data
      const calculateResults = () => {
        let annualSavings = 25000;
        let systemSize = '3 kW';
        let subsidyAmount = 30000;
        
        if (userData.monthlyBill === 'mid') {
          annualSavings = 35000;
          systemSize = '4 kW';
          subsidyAmount = 40000;
        } else if (userData.monthlyBill === 'high') {
          annualSavings = 60000;
          systemSize = '6 kW';
          subsidyAmount = 60000;
        } else if (userData.monthlyBill === 'vip') {
          annualSavings = 100000;
          systemSize = '10 kW';
          subsidyAmount = 78000;
        }
        
        return {
          annualSavings,
          systemSize,
          subsidyAmount,
          totalSavings: annualSavings * 25
        };
      };

      const results = calculateResults();
      setSolarResults(results);
      setShowResults(true);

      toast({
        title: "Quote Submitted!",
        description: "Your solar assessment has been completed successfully.",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return;
    
    const step = steps[currentStep - 1];
    
    // Validation
    if (step.validation) {
      const error = step.validation(inputValue);
      if (error) {
        setTimeout(() => {
          addMessage(error, false);
        }, 500);
        return;
      }
    }

    // Update user data
    setUserData(prev => ({
      ...prev,
      [step.id]: inputValue
    }));

    addMessage(inputValue, true);
    setInputValue('');
    
    setTimeout(() => {
      proceedToNextStep();
    }, 1000);
  };

  const handleButtonSelect = (value: string, label: string) => {
    const step = steps[currentStep - 1];
    
    setUserData(prev => ({
      ...prev,
      [step.id]: value
    }));

    addMessage(label, true);
    
    // Special handling for monthly bill
    if (step.id === 'monthlyBill') {
      setTimeout(() => {
        let systemSize = '2.5 kW';
        if (value === 'mid') systemSize = '3.5 kW';
        else if (value === 'high') systemSize = '5 kW';
        else if (value === 'vip') systemSize = '7.5 kW';
        
        addMessage(`Thanks! A bill like that suggests you'd benefit from a ${systemSize} solar system.`, false);
      }, 500);
    }
    
    // Special handling for referral - skip to referral contact step
    if (step.id === 'referralSource' && value === 'referral') {
      setTimeout(() => {
        proceedToNextStep(); // This will go to referral contact step
      }, 1000);
      return;
    }
    
    // For non-referral selections, skip referral contact step
    if (step.id === 'referralSource' && value !== 'referral') {
      setCurrentStep(prev => prev + 1); // Skip referral contact step
    }
    
    setTimeout(() => {
      proceedToNextStep();
    }, 1000);
  };

  const handleContactSubmit = () => {
    const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    
    const phone = phoneInput?.value.trim();
    const email = emailInput?.value.trim();
    
    if (!phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your mobile number",
        variant: "destructive"
      });
      return;
    }
    
    // Auto-format phone number to Indian standard
    const formattedPhone = phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
    
    setUserData(prev => ({
      ...prev,
      phone: formattedPhone,
      email: email || undefined
    }));
    
    addMessage(`📱 ${formattedPhone}${email ? `\n📧 ${email}` : ''}`, true);
    
    setTimeout(() => {
      proceedToNextStep();
    }, 1000);
  };

  const handleReferralContactSubmit = () => {
    const nameInput = document.getElementById('referralNameInput') as HTMLInputElement;
    const phoneInput = document.getElementById('referralPhoneInput') as HTMLInputElement;
    
    const name = nameInput?.value.trim();
    const phone = phoneInput?.value.trim();
    
    if (!name) {
      toast({
        title: "Name Required",
        description: "Please enter the referral name",
        variant: "destructive"
      });
      return;
    }
    
    let messageContent = `👤 ${name}`;
    let formattedPhone = null;
    
    if (phone) {
      // Auto-format phone number to Indian standard
      formattedPhone = phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
      messageContent += `\n📱 ${formattedPhone}`;
    }
    
    setUserData(prev => ({
      ...prev,
      referralName: name,
      referralPhone: formattedPhone
    }));
    
    addMessage(messageContent, true);
    
    setTimeout(() => {
      // Auto-complete after referral info
      submitSolarLead();
    }, 1000);
  };

  const handleSkipReferralContact = () => {
    setUserData(prev => ({
      ...prev,
      referralName: null,
      referralPhone: null
    }));
    
    addMessage("Skipped referral contact information", true);
    
    setTimeout(() => {
      submitSolarLead();
    }, 1000);
  };

  const getCurrentStep = () => {
    if (currentStep === 0 || currentStep > steps.length) return null;
    return steps[currentStep - 1];
  };

  const currentStepData = getCurrentStep();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden min-h-[600px] max-h-[800px] flex flex-col p-0">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-solar-blue to-solar-orange p-4 flex items-center space-x-3 shadow-lg">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-solar-orange to-solar-gold rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <Sun className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold text-lg">Yami</h2>
            <p className="text-blue-100 text-sm">Solar Assistant • Online</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        {isStarted && (
          <div className="bg-gray-100 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>Step {Math.min(currentStep, steps.length)} of {steps.length}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-solar-orange to-solar-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${(Math.min(currentStep, steps.length) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.isUser ? 'justify-end items-start space-x-2' : 'items-start space-x-2'}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 bg-gradient-to-r from-solar-orange to-solar-gold rounded-full flex items-center justify-center text-white text-sm">
                    <UserCheck className="w-4 h-4" />
                  </div>
                )}
                {message.isUser && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm ml-2">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div className={`${
                  message.isUser 
                    ? 'bg-blue-600 text-white rounded-lg rounded-tr-none' 
                    : 'bg-white border rounded-lg rounded-tl-none'
                } p-3 max-w-xs shadow-md`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-solar-orange to-solar-gold rounded-full flex items-center justify-center text-white text-sm">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="bg-gray-200 rounded-lg rounded-tl-none p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        {isStarted && currentStepData && (
          <div className="border-t bg-white p-4">
            {currentStepData.type === 'text' && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentStepData.placeholder || 'Type your answer...'}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                    className="rounded-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  onClick={handleTextSubmit}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-solar-orange to-solar-gold text-white p-3 rounded-full hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}

            {currentStepData.type === 'contact' && (
              <div className="space-y-3">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number (for instant WhatsApp/SMS results!) *
                  </Label>
                  <Input
                    id="phoneInput"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optional – for a detailed PDF backup)
                  </Label>
                  <Input
                    id="emailInput"
                    type="email"
                    placeholder="your.email@example.com"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button 
                  onClick={handleContactSubmit}
                  className="w-full bg-gradient-to-r from-solar-orange to-solar-gold text-white hover:opacity-90"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStepData.type === 'referral_contact' && (
              <div className="space-y-3">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Referral Name *
                  </Label>
                  <Input
                    id="referralNameInput"
                    type="text"
                    placeholder="Enter their full name"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Referral Contact Number (optional)
                  </Label>
                  <Input
                    id="referralPhoneInput"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleReferralContactSubmit}
                    className="flex-1 bg-gradient-to-r from-solar-orange to-solar-gold text-white hover:opacity-90"
                  >
                    Complete Assessment
                  </Button>
                  <Button 
                    onClick={handleSkipReferralContact}
                    variant="outline"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    Skip
                  </Button>
                </div>
              </div>
            )}

            {currentStepData.type === 'buttons' && (
              <div className="flex flex-wrap gap-2">
                {currentStepData.options?.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    onClick={() => handleButtonSelect(option.value, option.label)}
                    className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trust Badge */}
        <div className="bg-green-50 border-t border-green-200 p-3 text-center">
          <p className="text-green-700 text-xs font-medium flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>🔒 Your information is 100% secure with us. No spam, ever.</span>
          </p>
        </div>

        {/* Results Modal */}
        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent className="max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-solar-orange to-solar-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Amazing Results!</h2>
                <p className="text-gray-600">
                  {userData.name}, here's what your solar-powered future in {userData.location} looks like:
                </p>
              </div>

              {solarResults && (
                <>
                  {/* Savings Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">₹{solarResults.annualSavings.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Annual Savings</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{solarResults.systemSize}</p>
                        <p className="text-sm text-gray-600">Recommended System</p>
                      </div>
                    </div>
                  </div>

                  {/* Government Subsidy */}
                  <div className="bg-orange-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-orange-800 mb-2">🏛️ Government Subsidy</h3>
                    <p className="text-sm text-orange-700">
                      Great news! You are eligible for the PM Surya Ghar: Muft Bijli Yojana subsidy, up to{' '}
                      <strong>₹{solarResults.subsidyAmount.toLocaleString()}</strong> for this system!
                    </p>
                  </div>

                  {/* 25-Year Projection */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">📈 Long-term Savings</h3>
                    <p className="text-sm text-blue-700">
                      Over 25 years, that's over <strong>₹{solarResults.totalSavings.toLocaleString()}</strong> in savings!
                    </p>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-solar-orange to-solar-gold text-white hover:opacity-90">
                  <Phone className="w-4 h-4 mr-2" />
                  📞 Speak to an Expert Now
                </Button>
                <Button className="w-full bg-gradient-to-r from-solar-blue to-solar-orange text-white hover:opacity-90">
                  <Calendar className="w-4 h-4 mr-2" />
                  📅 Schedule a Free Site Survey
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  📧 Email My Full Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}