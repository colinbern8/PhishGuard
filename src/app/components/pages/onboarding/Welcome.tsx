import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Globe, Users, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const threats = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email Scams',
    description: 'Phishing emails, fake invoices, and impersonation attacks',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Web Threats',
    description: 'Malicious websites, fake login pages, and download traps',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'social',
    icon: Users,
    title: 'Social Engineering',
    description: 'Manipulation tactics, pretexting, and trust exploitation',
    color: 'from-orange-500 to-orange-600',
  },
];

export function OnboardingWelcome() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      // Store selection in localStorage for personalization
      localStorage.setItem('phishguard_primary_concern', selected);
      navigate('/onboarding/assessment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F4E78] to-[#3B82F6] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-2xl">
              <svg className="h-16 w-16 text-[#1F4E78] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to PhishGuard
          </h1>
          <p className="text-xl text-blue-100 dark:text-gray-300">
            Before we protect you, let's understand what worries you most
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {threats.map((threat, index) => {
            const Icon = threat.icon;
            const isSelected = selected === threat.id;

            return (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'ring-4 ring-white shadow-2xl'
                      : 'hover:shadow-xl'
                  } bg-white dark:bg-gray-800`}
                  onClick={() => setSelected(threat.id)}
                >
                  <div className={`bg-gradient-to-br ${threat.color} rounded-xl p-4 mb-4 inline-block`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {threat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {threat.description}
                  </p>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-4 flex items-center text-[#1F4E78] dark:text-blue-400"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Selected</span>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className="bg-white text-[#1F4E78] hover:bg-gray-100 px-8"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 0 ? 'w-8 bg-white' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
