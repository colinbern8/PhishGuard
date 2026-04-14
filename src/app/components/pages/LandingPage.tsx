import { Link } from 'react-router';
import { Shield, BookOpen, ScanSearch, Trophy, CheckCircle, Users, Award, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ThemeToggle } from '../ui/theme-toggle';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Demo Banner */}
      <div className="bg-[#28A745] text-white py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Info className="h-5 w-5" />
          <span className="font-medium">Demo Mode:</span>
          <span>Try it now with test credentials - demo@phishguard.com / PhishGuard2026!</span>
          <Link to="/login">
            <Button variant="outline" size="sm" className="ml-2 bg-white text-[#28A745] hover:bg-gray-100 border-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-[#1F4E78] dark:text-[#3B82F6]" />
              <span className="ml-2 text-xl font-bold text-[#1F4E78] dark:text-white">PhishGuard</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#1F4E78] hover:bg-[#2E75B6]">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1F4E78] to-[#2E75B6] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Master Phishing Detection.<br />Protect Your Digital Life.
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Learn to identify phishing attacks, test your skills, and defend against cyber threats 
            with our comprehensive training platform trusted by over 50,000 users.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-[#1F4E78] hover:bg-gray-100 text-lg px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#2E75B6] transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="bg-[#1F4E78] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learn</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access interactive training modules covering email phishing, social engineering, 
                  password security, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#2E75B6] transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="bg-[#1F4E78] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Test</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Challenge yourself with quizzes, earn achievements, and compete on leaderboards 
                  to prove your expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#2E75B6] transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="bg-[#1F4E78] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ScanSearch className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Defend</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use powerful scanner tools to analyze suspicious emails and URLs in real-time 
                  before they cause harm.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Join Our Growing Community</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Thousands of users are learning to identify threats</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#1F4E78] dark:text-[#3B82F6] mb-2">50,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1F4E78] dark:text-[#3B82F6] mb-2">200,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Modules Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1F4E78] dark:text-[#3B82F6] mb-2">15,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Threats Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1F4E78] dark:text-[#3B82F6] mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Everything You Need to Stay Safe</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Interactive Training Modules</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Beginner to advanced courses covering all aspects of phishing detection and prevention.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Real-Time Threat Scanner</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyze suspicious emails and URLs with AI-powered detection before clicking.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Gamification & Achievements</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn badges, climb leaderboards, and track your progress with engaging challenges.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Community Threat Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share and learn from real phishing attempts reported by the community.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Knowledge Hub</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access articles, guides, and resources from cybersecurity experts.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-[#28A745] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Security Tools Suite</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Password strength checker, breach detector, and URL expander tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "PhishGuard helped me identify a phishing email that almost got me. The training 
                  is practical and easy to understand!"
                </p>
                <p className="font-semibold dark:text-white">- Sarah M., Marketing Manager</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "The gamification keeps me engaged. I've learned so much about security while 
                  having fun earning badges!"
                </p>
                <p className="font-semibold dark:text-white">- James R., Student</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "As an IT administrator, I recommend PhishGuard to all my team members. 
                  It's comprehensive and effective."
                </p>
                <p className="font-semibold dark:text-white">- Alex K., IT Director</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1F4E78] to-[#2E75B6] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Become a Phishing Detection Expert?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users learning to protect themselves and their organizations from cyber threats.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-[#1F4E78] hover:bg-gray-100 text-lg px-8 py-6">
              Start Learning Today - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-[#2E75B6]" />
                <span className="ml-2 font-bold text-white">PhishGuard</span>
              </div>
              <p className="text-sm">
                Empowering users with knowledge to defend against phishing and cyber threats.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/signup" className="hover:text-white">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Knowledge Hub</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 PhishGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}