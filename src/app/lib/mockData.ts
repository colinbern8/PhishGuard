// Mock data for PhishGuard application

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  memberSince: string;
  bio?: string;
  totalPoints: number;
  rank: number;
  modulesCompleted: number;
  badgesEarned: number;
  currentStreak: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  thumbnail?: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  sections: ModuleSection[];
  prerequisiteId?: string | null;
}

export interface ModuleSection {
  id: string;
  title: string;
  completed: boolean;
  content: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Mock quiz questions by module
export const mockQuizzes: { [moduleId: string]: QuizQuestion[] } = {
  '1': [ // Email Phishing 101
    {
      id: '1',
      question: 'What is the most common type of phishing attack?',
      options: [
        'Email phishing',
        'SMS phishing (smishing)',
        'Voice phishing (vishing)',
        'Social media phishing'
      ],
      correctAnswer: 0,
      explanation: 'Email phishing remains the most common type of phishing attack, accounting for over 90% of all phishing attempts.'
    },
    {
      id: '2',
      question: 'Which of the following is a red flag in a phishing email?',
      options: [
        'Personalized greeting with your name',
        'Generic greeting like "Dear Customer"',
        'Company logo in the email',
        'Unsubscribe link at the bottom'
      ],
      correctAnswer: 1,
      explanation: 'Generic greetings are a common sign of phishing. Legitimate companies usually address you by name.'
    },
    {
      id: '3',
      question: 'What should you do if you receive a suspicious email asking you to verify your account?',
      options: [
        'Click the link and enter your credentials',
        'Reply to the email with your information',
        'Contact the company directly through official channels',
        'Forward it to all your contacts to warn them'
      ],
      correctAnswer: 2,
      explanation: 'Always verify suspicious requests by contacting the organization directly through their official website or phone number, not through links in the email.'
    },
    {
      id: '4',
      question: 'What does hovering over a link before clicking help you identify?',
      options: [
        'The file size of the linked page',
        'The actual URL destination',
        'Who sent the email',
        'When the email was sent'
      ],
      correctAnswer: 1,
      explanation: 'Hovering over a link reveals the actual URL destination, allowing you to check if it matches the claimed source.'
    },
    {
      id: '5',
      question: 'Which authentication method provides the best protection against phishing?',
      options: [
        'Strong password only',
        'Security questions',
        'Two-factor authentication (2FA)',
        'Email verification'
      ],
      correctAnswer: 2,
      explanation: 'Two-factor authentication adds an extra layer of security beyond passwords, making it much harder for attackers to gain access even if they phish your password.'
    }
  ],
  '2': [ // URL Analysis & Link Safety
    {
      id: '1',
      question: 'What does HTTPS in a URL indicate?',
      options: [
        'The website is completely safe',
        'The connection is encrypted',
        'The website is verified by Google',
        'The website cannot contain malware'
      ],
      correctAnswer: 1,
      explanation: 'HTTPS means the connection is encrypted, but it does not guarantee the website is legitimate or safe from phishing.'
    },
    {
      id: '2',
      question: 'Which URL is most likely a phishing attempt?',
      options: [
        'https://www.paypal.com',
        'https://www.paypa1.com',
        'https://paypal.com',
        'https://www.paypal.co.uk'
      ],
      correctAnswer: 1,
      explanation: 'paypa1.com uses the number "1" instead of the letter "l" - a common typosquatting technique used in phishing.'
    },
    {
      id: '3',
      question: 'What is URL shortening often used for in phishing attacks?',
      options: [
        'To make links easier to remember',
        'To hide the actual destination URL',
        'To improve email deliverability',
        'To track legitimate marketing campaigns'
      ],
      correctAnswer: 1,
      explanation: 'Attackers use URL shorteners to hide malicious destinations and make links appear more trustworthy.'
    },
    {
      id: '4',
      question: 'Where should you check a URL before clicking on it?',
      options: [
        'In the email subject line',
        'By hovering over the link',
        'In the email signature',
        'In the sender\'s name'
      ],
      correctAnswer: 1,
      explanation: 'Hovering over a link displays the actual URL destination, allowing you to verify it before clicking.'
    },
    {
      id: '5',
      question: 'What is "typosquatting"?',
      options: [
        'Making typing errors in URLs',
        'Registering domains with common misspellings of legitimate sites',
        'A technique to speed up website loading',
        'A form of web analytics'
      ],
      correctAnswer: 1,
      explanation: 'Typosquatting is when attackers register domains that are misspellings of legitimate sites to trick users.'
    }
  ],
  '3': [ // Social Engineering Tactics
    {
      id: '1',
      question: 'What is the primary goal of social engineering?',
      options: [
        'To hack computer systems directly',
        'To manipulate people into divulging confidential information',
        'To install antivirus software',
        'To create strong passwords'
      ],
      correctAnswer: 1,
      explanation: 'Social engineering exploits human psychology to trick people into revealing sensitive information or performing actions that compromise security.'
    },
    {
      id: '2',
      question: 'Which scenario is an example of pretexting?',
      options: [
        'A random email with a suspicious link',
        'Someone claiming to be from IT support requesting your password',
        'A pop-up warning about viruses',
        'An email with multiple spelling errors'
      ],
      correctAnswer: 1,
      explanation: 'Pretexting involves creating a fabricated scenario (pretext) to gain trust and extract information, such as impersonating IT support.'
    },
    {
      id: '3',
      question: 'What emotion do social engineers most commonly exploit?',
      options: [
        'Happiness',
        'Boredom',
        'Fear and urgency',
        'Curiosity alone'
      ],
      correctAnswer: 2,
      explanation: 'Fear and urgency are commonly exploited emotions, pressuring victims to act quickly without thinking critically.'
    },
    {
      id: '4',
      question: 'What is "tailgating" in physical security?',
      options: [
        'Following too closely while driving',
        'Following an authorized person into a restricted area',
        'Monitoring someone\'s computer screen',
        'Stealing mail from mailboxes'
      ],
      correctAnswer: 1,
      explanation: 'Tailgating is a physical social engineering technique where an unauthorized person follows someone with legitimate access into a restricted area.'
    },
    {
      id: '5',
      question: 'How should you respond to unsolicited requests for sensitive information?',
      options: [
        'Provide the information if they seem trustworthy',
        'Verify the request through official channels before responding',
        'Reply with half of the information to test them',
        'Ignore all requests completely'
      ],
      correctAnswer: 1,
      explanation: 'Always verify requests for sensitive information through official, known channels before providing any data.'
    }
  ],
  '4': [ // Password Security Best Practices
    {
      id: '1',
      question: 'What makes a password strong?',
      options: [
        'Using your birthday',
        'A mix of uppercase, lowercase, numbers, and symbols',
        'Using common words',
        'Making it easy to remember'
      ],
      correctAnswer: 1,
      explanation: 'Strong passwords combine uppercase and lowercase letters, numbers, and special characters to make them difficult to guess or crack.'
    },
    {
      id: '2',
      question: 'How often should you reuse the same password across different accounts?',
      options: [
        'Always - it makes it easier to remember',
        'Only for unimportant accounts',
        'Never - use unique passwords for each account',
        'Only for accounts on the same website'
      ],
      correctAnswer: 2,
      explanation: 'Never reuse passwords. If one account is compromised, all accounts with the same password are at risk.'
    },
    {
      id: '3',
      question: 'What is the primary benefit of using a password manager?',
      options: [
        'It makes all your passwords the same',
        'It generates and stores unique, strong passwords for each account',
        'It shares your passwords with friends',
        'It eliminates the need for two-factor authentication'
      ],
      correctAnswer: 1,
      explanation: 'Password managers generate unique, complex passwords for each account and store them securely, so you only need to remember one master password.'
    },
    {
      id: '4',
      question: 'What is two-factor authentication (2FA)?',
      options: [
        'Using two different passwords',
        'Requiring two forms of verification to access an account',
        'Having two email accounts',
        'Logging in twice'
      ],
      correctAnswer: 1,
      explanation: '2FA requires two different forms of verification (e.g., password + code from your phone) to access an account, adding an extra layer of security.'
    },
    {
      id: '5',
      question: 'Which is the WEAKEST password?',
      options: [
        'Tr0ub4dor&3',
        'correct-horse-battery-staple',
        'Password123',
        'mK9$vL2@pQw'
      ],
      correctAnswer: 2,
      explanation: 'Password123 is extremely weak because it uses a common word with predictable character substitution, making it easy to crack.'
    }
  ],
  '5': [ // Spear Phishing & Targeted Attacks
    {
      id: '1',
      question: 'What distinguishes spear phishing from regular phishing?',
      options: [
        'Spear phishing uses harpoons',
        'Spear phishing targets specific individuals with personalized content',
        'Spear phishing only happens on Tuesdays',
        'Spear phishing is always sent via SMS'
      ],
      correctAnswer: 1,
      explanation: 'Spear phishing is highly targeted, using personalized information about the victim to appear more legitimate and increase success rates.'
    },
    {
      id: '2',
      question: 'Where do attackers typically gather information for spear phishing attacks?',
      options: [
        'Random guessing',
        'Social media profiles and public databases',
        'Magic',
        'Only from data breaches'
      ],
      correctAnswer: 1,
      explanation: 'Attackers research victims through social media, LinkedIn, company websites, and other public sources to craft convincing, personalized messages.'
    },
    {
      id: '3',
      question: 'What is "whaling" in cybersecurity?',
      options: [
        'Phishing attacks targeting high-profile executives',
        'Attacks from ocean-based hackers',
        'A type of malware that spreads slowly',
        'Attacks on marine biology databases'
      ],
      correctAnswer: 0,
      explanation: 'Whaling is spear phishing that specifically targets senior executives, CEOs, and other high-profile individuals ("big fish").'
    },
    {
      id: '4',
      question: 'What should you do if you receive a highly personalized suspicious email?',
      options: [
        'Trust it because they know your information',
        'Report it to your security team and verify through official channels',
        'Reply asking for more details',
        'Forward it to all colleagues as a warning'
      ],
      correctAnswer: 1,
      explanation: 'Even personalized emails can be attacks. Always report suspicious communications and verify through known, official channels.'
    },
    {
      id: '5',
      question: 'What is Business Email Compromise (BEC)?',
      options: [
        'When your business email has typos',
        'Targeted attacks impersonating business executives to authorize fraudulent transactions',
        'Email marketing gone wrong',
        'Using personal email for business'
      ],
      correctAnswer: 1,
      explanation: 'BEC attacks impersonate executives or trusted partners to trick employees into transferring money or revealing sensitive information.'
    }
  ],
  '6': [ // Mobile Device Security
    {
      id: '1',
      question: 'What is "smishing"?',
      options: [
        'Phishing via SMS/text messages',
        'A new social media platform',
        'A type of malware',
        'Email phishing on mobile devices'
      ],
      correctAnswer: 0,
      explanation: 'Smishing is phishing conducted through SMS text messages, often containing malicious links or requests for personal information.'
    },
    {
      id: '2',
      question: 'Why are mobile devices particularly vulnerable to phishing?',
      options: [
        'Mobile devices can\'t have antivirus',
        'Smaller screens make it harder to verify URLs and details',
        'Mobile phones don\'t connect to the internet',
        'All mobile apps are malicious'
      ],
      correctAnswer: 1,
      explanation: 'Small screens make it difficult to see full URLs, verify sender details, and spot warning signs that might be obvious on desktop.'
    },
    {
      id: '3',
      question: 'What should you check before downloading a mobile app?',
      options: [
        'Only the app name',
        'Developer reputation, reviews, permissions requested, and download count',
        'Just the app icon',
        'Nothing - all app stores are completely safe'
      ],
      correctAnswer: 1,
      explanation: 'Always verify the developer, read reviews, check what permissions the app requests, and be wary of apps with few downloads or suspicious ratings.'
    },
    {
      id: '4',
      question: 'What is the risk of connecting to public Wi-Fi networks?',
      options: [
        'No risk at all',
        'Attackers can intercept unencrypted data',
        'Your phone will break',
        'It\'s only risky on Tuesdays'
      ],
      correctAnswer: 1,
      explanation: 'Public Wi-Fi networks are often unsecured, allowing attackers to intercept data. Use VPNs and avoid sensitive transactions on public networks.'
    },
    {
      id: '5',
      question: 'What is a key security feature you should enable on your mobile device?',
      options: [
        'Automatic app installation',
        'Screen lock with biometric or PIN authentication',
        'Disabling all updates',
        'Removing all passwords'
      ],
      correctAnswer: 1,
      explanation: 'Screen locks with biometric authentication (fingerprint/face) or strong PINs prevent unauthorized access if your device is lost or stolen.'
    }
  ]
};

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  points: number;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  progressMax?: number;
  requirement?: string;
  category: 'Training' | 'Security' | 'Community' | 'Expert';
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar?: string;
  points: number;
  badges: number;
  trend: 'up' | 'down' | 'same';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  featured: boolean;
  thumbnail?: string;
}

export interface ScanResult {
  id: string;
  type: 'email' | 'url';
  content: string;
  riskScore: number;
  verdict: 'safe' | 'suspicious' | 'dangerous';
  timestamp: string;
  analysis: {
    knownMalicious: boolean;
    blacklisted: boolean;
    similarThreats: number;
    suspiciousLinks?: string[];
    aiConfidence: number;
    recommendations: string[];
  };
}

export interface Incident {
  id: string;
  type: 'email' | 'url' | 'sms';
  threatLevel: 'low' | 'medium' | 'high';
  description: string;
  content: string;
  submittedBy: string;
  submittedDate: string;
  upvotes: number;
  verified: boolean;
  status: 'verified' | 'under-review' | 'false-report';
  tags: string[];
}

// Mock current user
export const mockCurrentUser: User = {
  id: '1',
  username: 'SecurityPro',
  email: 'demo@phishguard.com', // Test login: demo@phishguard.com / PhishGuard2026!
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecurityPro',
  memberSince: '2025-08-15',
  bio: 'Cybersecurity enthusiast learning to identify and prevent phishing attacks.',
  totalPoints: 1450,
  rank: 127,
  modulesCompleted: 12,
  badgesEarned: 15,
  currentStreak: 7,
};

// Mock training modules
export const mockModules: Module[] = [
  {
    id: '1',
    title: 'Email Phishing 101',
    description: 'Learn the fundamentals of identifying phishing emails and protecting yourself from common email-based attacks.',
    difficulty: 'Beginner',
    duration: '45 min',
    category: 'Email Security',
    progress: 100,
    status: 'completed',
    prerequisiteId: null,
    sections: [
      { 
        id: '1-1', 
        title: 'What is Phishing?', 
        completed: true, 
        content: `<h2>Understanding Phishing Attacks</h2>
<p>Phishing is a type of cybercrime where attackers impersonate legitimate organizations or individuals to trick victims into revealing sensitive information such as passwords, credit card numbers, or personal data.</p>

<h3>Key Characteristics of Phishing</h3>
<ul>
  <li><strong>Impersonation:</strong> Attackers pretend to be trusted entities like banks, government agencies, or well-known companies.</li>
  <li><strong>Urgency:</strong> Messages often create a sense of urgency to pressure victims into acting quickly without thinking.</li>
  <li><strong>Deceptive Links:</strong> Emails contain links that look legitimate but lead to fake websites designed to steal information.</li>
  <li><strong>Request for Sensitive Data:</strong> Legitimate organizations rarely ask for passwords or personal information via email.</li>
</ul>

<div class="info-box">
<p><strong>Did You Know?</strong> Over 90% of successful cyberattacks start with a phishing email. Learning to recognize these attacks is your first line of defense.</p>
</div>

<h3>Common Types of Phishing</h3>
<p>Phishing attacks come in various forms:</p>
<ul>
  <li><strong>Email Phishing:</strong> Mass emails sent to thousands of victims</li>
  <li><strong>Spear Phishing:</strong> Targeted attacks on specific individuals</li>
  <li><strong>Smishing:</strong> Phishing via SMS text messages</li>
  <li><strong>Vishing:</strong> Voice phishing through phone calls</li>
</ul>`
      },
      { 
        id: '1-2', 
        title: 'Common Red Flags', 
        completed: true, 
        content: `<h2>Spotting Phishing Red Flags</h2>
<p>Learning to identify warning signs in emails can help you avoid falling victim to phishing attacks. Here are the most common red flags to watch for:</p>

<h3>1. Generic Greetings</h3>
<p>Legitimate companies typically address you by name. Be suspicious of emails that start with:</p>
<ul>
  <li>"Dear Customer"</li>
  <li>"Dear User"</li>
  <li>"Dear Account Holder"</li>
</ul>

<h3>2. Suspicious Sender Addresses</h3>
<p>Always check the sender's email address carefully. Phishers often use addresses that look similar to legitimate ones:</p>
<ul>
  <li>paypa1-support@secure-login.com (using "1" instead of "l")</li>
  <li>support@amaz0n-verification.net (using "0" instead of "o")</li>
  <li>security@bankofamerica.support-team.com (suspicious domain)</li>
</ul>

<h3>3. Urgent or Threatening Language</h3>
<p>Phishing emails create artificial urgency to make you act without thinking:</p>
<ul>
  <li>"Your account will be closed in 24 hours!"</li>
  <li>"Immediate action required!"</li>
  <li>"Suspicious activity detected - verify now!"</li>
</ul>

<h3>4. Suspicious Links and Attachments</h3>
<p>Hover over links before clicking to see the actual destination. Never download unexpected attachments.</p>

<div class="warning-box">
<p><strong>Warning:</strong> Even if an email looks legitimate, always verify requests for sensitive information by contacting the organization directly through official channels.</p>
</div>

<h3>5. Poor Grammar and Spelling</h3>
<p>Many phishing emails contain obvious spelling mistakes, grammatical errors, or awkward phrasing - signs that they weren't created by professional organizations.</p>`
      },
      { 
        id: '1-3', 
        title: 'Real-World Examples', 
        completed: true, 
        content: `<h2>Analyzing Real Phishing Attempts</h2>
<p>Let's examine actual phishing emails and learn what makes them suspicious.</p>

<h3>Example 1: Fake Bank Alert</h3>
<div class="example-box">
<p><strong>From:</strong> security@bankofamerica-alert.com<br>
<strong>Subject:</strong> URGENT: Unusual Activity Detected</p>
<p>Dear Valued Customer,</p>
<p>We have detected unusual activity on your account. Click here immediately to verify your identity or your account will be suspended within 24 hours.</p>
<p>[Verify Account Now]</p>
</div>

<h4>Red Flags:</h4>
<ul>
  <li>Suspicious sender domain (bankofamerica-alert.com, not bankofamerica.com)</li>
  <li>Generic greeting ("Valued Customer" instead of your name)</li>
  <li>Urgent threat of account suspension</li>
  <li>Request to click a link immediately</li>
</ul>

<h3>Example 2: Fake Package Delivery</h3>
<div class="example-box">
<p><strong>From:</strong> deliveries@fedx-tracking.net<br>
<strong>Subject:</strong> Your Package Delivery Failed</p>
<p>Hello,</p>
<p>We attempted to deliver your package but no one was home. Download the attached label to schedule redelivery.</p>
<p>[Download Label.exe]</p>
</div>

<h4>Red Flags:</h4>
<ul>
  <li>Misspelled company name (FedX instead of FedEx)</li>
  <li>Suspicious domain extension</li>
  <li>Unexpected package notification</li>
  <li>Executable file attachment (.exe) - a major warning sign</li>
</ul>

<h3>Example 3: Fake Tech Support</h3>
<div class="example-box">
<p><strong>From:</strong> support@microsoft-securityalert.com<br>
<strong>Subject:</strong> Your Microsoft Account Has Been Compromised</p>
<p>Your account shows signs of unauthorized access. Please click below to reset your password immediately.</p>
</div>

<h4>Red Flags:</h4>
<ul>
  <li>Non-official Microsoft domain</li>
  <li>Scare tactics about compromise</li>
  <li>Microsoft would never send password reset requests via email</li>
</ul>

<div class="info-box">
<p><strong>Best Practice:</strong> When in doubt, go directly to the company's official website by typing the URL yourself, rather than clicking links in emails.</p>
</div>`
      },
    ],
  },
  {
    id: '2',
    title: 'URL Analysis & Link Safety',
    description: 'Master the art of analyzing URLs to detect malicious links before clicking them.',
    difficulty: 'Beginner',
    duration: '30 min',
    category: 'Web Safety',
    progress: 60,
    status: 'in-progress',
    prerequisiteId: '1',
    sections: [
      { 
        id: '2-1', 
        title: 'Understanding URLs', 
        completed: true, 
        content: `<h2>URL Anatomy and Structure</h2>
<p>Understanding how URLs work is essential for identifying malicious links. Let's break down the components of a URL.</p>

<h3>Parts of a URL</h3>
<p>A typical URL consists of several parts:</p>
<pre>https://www.example.com:443/path/page.html?id=123#section</pre>

<ul>
  <li><strong>Protocol:</strong> https:// - Indicates secure, encrypted connection</li>
  <li><strong>Subdomain:</strong> www - Optional prefix to the domain</li>
  <li><strong>Domain:</strong> example.com - The main website address</li>
  <li><strong>Port:</strong> :443 - Usually hidden (443 for HTTPS, 80 for HTTP)</li>
  <li><strong>Path:</strong> /path/page.html - Specific page location</li>
  <li><strong>Query:</strong> ?id=123 - Parameters passed to the page</li>
  <li><strong>Fragment:</strong> #section - Specific section on the page</li>
</ul>

<h3>HTTPS vs HTTP</h3>
<p><strong>HTTPS (Secure):</strong> Data is encrypted between your browser and the website. Look for the padlock icon.</p>
<p><strong>HTTP (Not Secure):</strong> Data is sent in plain text and can be intercepted. Avoid entering sensitive information on HTTP sites.</p>

<div class="warning-box">
<p><strong>Important:</strong> HTTPS only means the connection is encrypted - it does NOT guarantee the website is legitimate or safe. Phishing sites can also use HTTPS!</p>
</div>

<h3>Domain vs Subdomain</h3>
<p>The domain is the most important part to verify:</p>
<ul>
  <li><strong>Legitimate:</strong> login.paypal.com (subdomain of paypal.com)</li>
  <li><strong>FAKE:</strong> paypal.com.secure-login.net (subdomain of secure-login.net)</li>
</ul>

<p>Always read the URL from right to left to identify the actual domain!</p>`
      },
      { 
        id: '2-2', 
        title: 'Spotting Fake Domains', 
        completed: true, 
        content: `<h2>Common Domain Spoofing Techniques</h2>
<p>Attackers use clever tricks to make fake domains look legitimate. Here's how to spot them.</p>

<h3>1. Typosquatting</h3>
<p>Using common misspellings of legitimate domains:</p>
<ul>
  <li>paypa<strong>1</strong>.com (using number 1 instead of letter l)</li>
  <li>amaz<strong>0</strong>n.com (using number 0 instead of letter o)</li>
  <li>face<strong>b00k</strong>.com (multiple character substitutions)</li>
  <li>micro<strong>s0ft</strong>.com</li>
</ul>

<h3>2. Homograph Attacks</h3>
<p>Using characters from different alphabets that look identical:</p>
<ul>
  <li>аpple.com (using Cyrillic "а" instead of Latin "a")</li>
  <li>gооgle.com (using Cyrillic "о" instead of Latin "o")</li>
</ul>

<h3>3. Subdomain Tricks</h3>
<p>Making the fake site appear as a subdomain:</p>
<ul>
  <li>paypal.com.verify-account.net (real domain is verify-account.net)</li>
  <li>amazon.com-security.info (real domain is com-security.info)</li>
</ul>

<h3>4. Extra Words or Characters</h3>
<ul>
  <li>paypal<strong>-secure</strong>.com</li>
  <li>paypal<strong>verify</strong>.com</li>
  <li>paypal<strong>-login</strong>.net</li>
</ul>

<h3>5. Wrong Top-Level Domain (TLD)</h3>
<p>Using similar but different domain extensions:</p>
<ul>
  <li>paypal.com<strong>.co</strong> (instead of .com)</li>
  <li>paypal.<strong>cm</strong> (instead of .com)</li>
  <li>paypal.<strong>net</strong> (instead of .com)</li>
</ul>

<div class="info-box">
<p><strong>Pro Tip:</strong> Bookmark frequently visited websites so you don't have to type the URL or click links in emails.</p>
</div>

<h3>URL Shorteners</h3>
<p>Services like bit.ly, tinyurl.com hide the actual destination. Be extra cautious with shortened URLs, especially in unsolicited messages.</p>`
      },
      { 
        id: '2-3', 
        title: 'Safe Browsing Practices', 
        completed: false, 
        content: `<h2>Best Practices for Safe Web Browsing</h2>
<p>Follow these guidelines to protect yourself while browsing the internet.</p>

<h3>Before Clicking Any Link</h3>
<ol>
  <li><strong>Hover First:</strong> Move your mouse over the link to see the actual URL in the bottom-left of your browser</li>
  <li><strong>Check the Domain:</strong> Verify it matches the legitimate website</li>
  <li><strong>Look for HTTPS:</strong> Ensure sensitive sites use encrypted connections</li>
  <li><strong>Avoid Suspicious URLs:</strong> Extra-long URLs, strange characters, or misspellings</li>
</ol>

<h3>When Entering Sensitive Information</h3>
<ul>
  <li>Always check the URL bar to confirm you're on the correct website</li>
  <li>Look for the padlock icon indicating HTTPS</li>
  <li>Never enter passwords or credit card details on HTTP sites</li>
  <li>Be suspicious if asked for unusual information</li>
</ul>

<h3>Use URL Checking Tools</h3>
<p>Several free services can help verify if a URL is safe:</p>
<ul>
  <li>Google Safe Browsing</li>
  <li>VirusTotal</li>
  <li>URLVoid</li>
  <li>PhishTank</li>
</ul>

<h3>Browser Security Features</h3>
<p>Modern browsers have built-in protections:</p>
<ul>
  <li><strong>Phishing Protection:</strong> Warns you about known dangerous sites</li>
  <li><strong>Pop-up Blocker:</strong> Prevents unwanted windows</li>
  <li><strong>Download Scanning:</strong> Checks files for malware</li>
  <li><strong>Privacy Mode:</strong> Doesn't save browsing history</li>
</ul>

<div class="warning-box">
<p><strong>Critical Rule:</strong> When in doubt, don't click! Type the URL directly or use a saved bookmark instead.</p>
</div>

<h3>Mobile Browsing Safety</h3>
<p>Mobile devices make it harder to verify URLs:</p>
<ul>
  <li>Small screens hide full URLs</li>
  <li>Harder to hover over links</li>
  <li>Be extra cautious on mobile devices</li>
  <li>Use official apps instead of mobile browsers when possible</li>
</ul>`
      },
    ],
  },
  {
    id: '3',
    title: 'Social Engineering Tactics',
    description: 'Understand psychological manipulation techniques used by attackers to gain unauthorized access.',
    difficulty: 'Intermediate',
    duration: '60 min',
    category: 'Social Engineering',
    progress: 0,
    status: 'not-started',
    sections: [
      { 
        id: '3-1', 
        title: 'Psychology of Manipulation', 
        completed: false, 
        content: `<h2>Understanding Social Engineering</h2>
<p>Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into breaking security procedures or revealing confidential information.</p>

<h3>Why Social Engineering Works</h3>
<p>Humans are the weakest link in security because we:</p>
<ul>
  <li><strong>Trust by Default:</strong> We want to be helpful and trust others</li>
  <li><strong>Fear Authority:</strong> We comply with people who appear to be in positions of power</li>
  <li><strong>React to Urgency:</strong> Time pressure prevents critical thinking</li>
  <li><strong>Seek Validation:</strong> We want to belong and be accepted</li>
</ul>

<h3>Core Psychological Triggers</h3>
<p>Social engineers exploit these fundamental human emotions and behaviors:</p>

<h4>1. Authority</h4>
<p>Attackers impersonate authority figures like IT staff, executives, or government officials. People naturally comply with authority without questioning.</p>

<h4>2. Urgency/Scarcity</h4>
<p>Creating artificial time pressure forces quick decisions without proper verification. "Act now or lose access!" bypasses rational thinking.</p>

<h4>3. Fear</h4>
<p>Threatening negative consequences (account closure, legal action, job loss) triggers panic and compliance.</p>

<h4>4. Curiosity</h4>
<p>Mysterious messages or unexpected offers exploit our natural curiosity to click links or open attachments.</p>

<h4>5. Greed</h4>
<p>Promises of money, prizes, or exclusive deals override caution.</p>

<h4>6. Trust</h4>
<p>Building rapport and appearing friendly makes victims lower their guard.</p>

<div class="info-box">
<p><strong>Key Insight:</strong> Social engineers are skilled manipulators who study human behavior. Awareness of these tactics is your best defense.</p>
</div>

<h3>The Social Engineering Lifecycle</h3>
<p>Understanding how attackers operate helps you recognize and defend against their tactics:</p>
<ol>
  <li><strong>Research:</strong> Gathering information about the target</li>
  <li><strong>Hook:</strong> Making initial contact and establishing trust</li>
  <li><strong>Play:</strong> Manipulating the victim to achieve the goal</li>
  <li><strong>Exit:</strong> Leaving without raising suspicion</li>
</ol>`
      },
      { 
        id: '3-2', 
        title: 'Pretexting Attacks', 
        completed: false, 
        content: `<h2>Pretexting: Creating False Scenarios</h2>
<p>Pretexting is when an attacker creates a fabricated scenario (the "pretext") to trick victims into providing information or access.</p>

<h3>Common Pretexting Scenarios</h3>

<h4>1. Fake IT Support</h4>
<div class="example-box">
<p>"Hi, this is John from IT. We're experiencing a system outage and need to verify your credentials to restore your account access."</p>
</div>

<p><strong>Red Flags to Watch For:</strong></p>
<ul>
  <li>Real IT never asks for passwords</li>
  <li>Unsolicited "help" with urgent problems</li>
  <li>Pressure to act immediately</li>
</ul>

<h4>2. Vendor Impersonation</h4>
<div class="example-box">
<p>"This is Sarah from your software vendor. Your license has expired. I need your credit card to renew it immediately or your service will be interrupted."</p>
</div>

<p><strong>Red Flags to Watch For:</strong></p>
<ul>
  <li>Unexpected payment requests</li>
  <li>Calling instead of official billing channels</li>
  <li>Urgent renewal threats</li>
</ul>

<h4>3. Executive Impersonation</h4>
<div class="example-box">
<p>"Hi, this is the CEO. I'm in a meeting and need you to quickly transfer $50,000 to this account for an urgent business deal."</p>
</div>

<p><strong>Red Flags to Watch For:</strong></p>
<ul>
  <li>Unusual requests from executives</li>
  <li>Bypassing normal approval processes</li>
  <li>Secrecy and urgency</li>
</ul>

<h4>4. Fake Survey or Research</h4>
<div class="example-box">
<p>"We're conducting a customer satisfaction survey. Can you verify your account details and recent transactions?"</p>
</div>

<p><strong>Red Flags to Watch For:</strong></p>
<ul>
  <li>Unsolicited surveys asking for sensitive data</li>
  <li>Personal or financial information requests</li>
  <li>Pressure to participate immediately</li>
</ul>

<h3>Advanced Pretexting Techniques</h3>
<p>Sophisticated attackers use these methods to increase their credibility:</p>

<h4>Layering</h4>
<p>Building credibility through multiple interactions. The attacker may call several times, each time gathering small pieces of information.</p>

<h4>Name Dropping</h4>
<p>Using names of real employees or executives to establish credibility.</p>

<h4>Technical Jargon</h4>
<p>Using industry-specific language to appear knowledgeable and legitimate.</p>

<div class="warning-box">
<p><strong>Defense Strategy:</strong> Always verify the identity of callers through official channels. Hang up and call back using a known, trusted number.</p>
</div>

<h3>Protecting Yourself</h3>
<p>Follow these guidelines to defend against pretexting attacks:</p>
<ul>
  <li><strong>Verify Identity:</strong> Always confirm through official channels</li>
  <li><strong>Question Everything:</strong> Legitimate requests won't pressure you</li>
  <li><strong>Follow Procedures:</strong> Don't bypass security protocols</li>
  <li><strong>Trust Your Instincts:</strong> If something feels wrong, it probably is</li>
</ul>`
      },
      { 
        id: '3-3', 
        title: 'Defense Strategies', 
        completed: false, 
        content: `<h2>Defending Against Social Engineering</h2>
<p>Learn practical strategies to protect yourself and your organization from manipulation attacks.</p>

<h3>Personal Defense Strategies</h3>

<h4>1. Healthy Skepticism</h4>
<p>Develop a questioning mindset:</p>
<ul>
  <li>Who is contacting me?</li>
  <li>Why do they need this information?</li>
  <li>Can I verify their identity?</li>
  <li>Is this request normal?</li>
</ul>

<h4>2. Verification Procedures</h4>
<p>Always verify before taking action:</p>
<ul>
  <li><strong>Callback Verification:</strong> Hang up and call back using official numbers</li>
  <li><strong>Out-of-Band Confirmation:</strong> Use different communication channels</li>
  <li><strong>In-Person Verification:</strong> For sensitive requests, verify face-to-face</li>
</ul>

<h4>3. Slow Down</h4>
<p>Urgency is a manipulation tactic:</p>
<ul>
  <li>Take time to think critically</li>
  <li>Legitimate requests can wait for verification</li>
  <li>Don't let pressure override good judgment</li>
</ul>

<h4>4. Protect Personal Information</h4>
<p>Be mindful of what you share:</p>
<ul>
  <li>Limit what you share on social media</li>
  <li>Be careful about work details online</li>
  <li>Attackers use this information for targeted attacks</li>
</ul>

<h3>Organizational Defenses</h3>
<p>Companies should implement these protective measures:</p>

<h4>Security Awareness Training</h4>
<ul>
  <li>Regular training on social engineering tactics</li>
  <li>Simulated phishing exercises</li>
  <li>Clear reporting procedures for suspicious activity</li>
</ul>

<h4>Clear Policies and Procedures</h4>
<ul>
  <li>Define who can request what information</li>
  <li>Establish verification requirements</li>
  <li>Document approval processes</li>
  <li>Never bypass security for convenience</li>
</ul>

<h4>Technical Controls</h4>
<ul>
  <li>Multi-factor authentication</li>
  <li>Least privilege access</li>
  <li>Monitoring and logging</li>
  <li>Caller ID verification systems</li>
</ul>

<h3>Physical Security Measures</h3>
<p>Don't overlook physical security vulnerabilities:</p>

<h4>Tailgating Prevention</h4>
<p>Don't let strangers follow you through secure doors:</p>
<ul>
  <li>Always close doors behind you</li>
  <li>Politely ask people to use their own credentials</li>
  <li>Report strangers in secure areas</li>
</ul>

<h4>Clean Desk Policy</h4>
<ul>
  <li>Lock sensitive documents away</li>
  <li>Don't leave passwords visible</li>
  <li>Secure devices when leaving workspace</li>
</ul>

<h4>Visitor Management</h4>
<ul>
  <li>Proper sign-in procedures</li>
  <li>Escort visitors in secure areas</li>
  <li>Visible identification badges</li>
</ul>

<div class="info-box">
<p><strong>Remember:</strong> It's okay to say no, ask questions, and verify requests. Real professionals will understand and appreciate your caution.</p>
</div>

<h3>Reporting Suspicious Activity</h3>
<p>If you suspect a social engineering attempt:</p>
<ol>
  <li>Don't engage further with the attacker</li>
  <li>Document what happened</li>
  <li>Report to your security team immediately</li>
  <li>Change passwords if you revealed any credentials</li>
  <li>Monitor accounts for unusual activity</li>
</ol>

<h3>Building a Security Culture</h3>
<p>Create an environment where security is a shared responsibility:</p>
<ul>
  <li>Encourage reporting without fear of blame</li>
  <li>Celebrate people who spot and report attacks</li>
  <li>Regular communication about threats</li>
  <li>Make security everyone's responsibility</li>
</ul>`
      },
    ],
  },
  {
    id: '4',
    title: 'Password Security Best Practices',
    description: 'Create strong, unique passwords and learn modern authentication methods.',
    difficulty: 'Beginner',
    duration: '25 min',
    category: 'Password Security',
    progress: 0,
    status: 'not-started',
    prerequisiteId: null,
    sections: [
      { 
        id: '4-1', 
        title: 'Password Strength Basics', 
        completed: false, 
        content: `<h2>Creating Strong Passwords</h2>
<p>Passwords are your first line of defense against unauthorized access. Understanding what makes a password strong is essential for protecting your accounts.</p>

<h3>What Makes a Password Strong?</h3>
<p>A strong password has these characteristics:</p>
<ul>
  <li><strong>Length:</strong> At least 12-16 characters (longer is better)</li>
  <li><strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and symbols</li>
  <li><strong>Unpredictability:</strong> Not based on personal information or common words</li>
  <li><strong>Uniqueness:</strong> Different for every account</li>
</ul>

<h3>Common Password Mistakes</h3>
<p>Avoid these weak password patterns that hackers exploit:</p>

<h4>1. Dictionary Words</h4>
<p>Simple words like "password," "welcome," or "admin" are cracked instantly by automated tools.</p>

<h4>2. Personal Information</h4>
<p>Birthdays, names, pet names, addresses - all easily discoverable on social media.</p>
<ul>
  <li>John1985 (name + birth year)</li>
  <li>Fluffy123 (pet name + numbers)</li>
  <li>Lakers2024 (favorite team)</li>
</ul>

<h4>3. Predictable Patterns</h4>
<ul>
  <li>123456 or qwerty</li>
  <li>Password123!</li>
  <li>abc123xyz</li>
</ul>

<h4>4. Simple Substitutions</h4>
<p>Replacing letters with numbers is predictable:</p>
<ul>
  <li>P@ssw0rd (hackers know these patterns)</li>
  <li>L3tM3In</li>
</ul>

<div class="warning-box">
<p><strong>Critical:</strong> Never reuse passwords across accounts! If one site is breached, all your accounts with that password are compromised.</p>
</div>

<h3>Password Strength Examples</h3>

<h4>Weak Password</h4>
<pre>Password123</pre>
<p>Why it's weak: Common word, predictable pattern, too short</p>

<h4>Medium Password</h4>
<pre>Fluffy2024!</pre>
<p>Why it's medium: Personal information, still somewhat predictable</p>

<h4>Strong Password</h4>
<pre>T7$mK9@pQw#2vL4n</pre>
<p>Why it's strong: Long, random, mix of characters, no patterns</p>

<h3>Passphrase Method</h3>
<p>An alternative approach using random words:</p>
<pre>Correct-Horse-Battery-Staple-97</pre>

<p>Benefits:</p>
<ul>
  <li>Easier to remember than random characters</li>
  <li>Long length provides strong security</li>
  <li>Use 4-5 random, unrelated words</li>
  <li>Add numbers and symbols for extra strength</li>
</ul>

<div class="info-box">
<p><strong>Pro Tip:</strong> Use a password manager to generate and store complex passwords - you only need to remember one master password!</p>
</div>`
      },
      { 
        id: '4-2', 
        title: 'Password Managers', 
        completed: false, 
        content: `<h2>Using Password Managers</h2>
<p>Password managers are essential tools for modern security. They generate, store, and auto-fill strong, unique passwords for all your accounts.</p>

<h3>Why Use a Password Manager?</h3>

<h4>1. Generate Strong Passwords</h4>
<p>Creates cryptographically random passwords that are impossible to guess or crack:</p>
<pre>mK9$vL2@pQw#7nT4bR6&sX3*hY8!</pre>

<h4>2. Remember Everything</h4>
<p>You only need to remember one master password - the manager handles the rest.</p>

<h4>3. Unique Password for Every Site</h4>
<p>If one site is breached, your other accounts remain secure because each has a different password.</p>

<h4>4. Auto-Fill Credentials</h4>
<p>Convenience without sacrificing security - no more typing or forgetting passwords.</p>

<h4>5. Cross-Platform Sync</h4>
<p>Access your passwords on all devices - phone, tablet, computer.</p>

<h3>Popular Password Managers</h3>

<h4>Cloud-Based Options</h4>
<ul>
  <li><strong>1Password:</strong> User-friendly, family plans, secure sharing</li>
  <li><strong>Bitwarden:</strong> Open-source, affordable, feature-rich</li>
  <li><strong>LastPass:</strong> Popular, free tier available</li>
  <li><strong>Dashlane:</strong> Dark web monitoring, VPN included</li>
</ul>

<h4>Local/Offline Options</h4>
<ul>
  <li><strong>KeePass:</strong> Free, open-source, stores database locally</li>
  <li><strong>KeePassXC:</strong> Modern fork of KeePass with better UI</li>
</ul>

<h3>How Password Managers Work</h3>
<p>Understanding the security model:</p>

<h4>Encryption</h4>
<p>Your passwords are encrypted with military-grade AES-256 encryption before being stored.</p>

<h4>Master Password</h4>
<p>Only you know this password - it never leaves your device and the company cannot recover it.</p>

<h4>Zero-Knowledge Architecture</h4>
<p>Reputable password managers cannot see your passwords, even if their servers are compromised.</p>

<div class="info-box">
<p><strong>Key Insight:</strong> A password manager is far more secure than reusing passwords or writing them down. The master password is the only one you need to make extremely strong.</p>
</div>

<h3>Best Practices for Password Managers</h3>

<h4>Creating a Strong Master Password</h4>
<p>Your master password should be:</p>
<ul>
  <li>At least 16-20 characters long</li>
  <li>Memorable but not guessable</li>
  <li>Never used anywhere else</li>
  <li>Consider using a long passphrase</li>
</ul>

<h4>Enable Two-Factor Authentication</h4>
<p>Add an extra layer of security to your password manager with 2FA.</p>

<h4>Regular Security Audits</h4>
<p>Most password managers can:</p>
<ul>
  <li>Identify weak or reused passwords</li>
  <li>Alert you to compromised passwords from data breaches</li>
  <li>Suggest password updates</li>
</ul>

<h4>Secure Your Master Password</h4>
<ul>
  <li>Never share it with anyone</li>
  <li>Don't write it down in plain text</li>
  <li>Consider an emergency recovery plan for family</li>
</ul>

<div class="warning-box">
<p><strong>Warning:</strong> If you forget your master password, your data cannot be recovered. Write it down and store it in a physically secure location initially, then memorize it.</p>
</div>

<h3>Common Concerns Addressed</h3>

<h4>"What if the password manager gets hacked?"</h4>
<p>Zero-knowledge encryption means even if servers are breached, attackers only get encrypted data they cannot decrypt without your master password.</p>

<h4>"Isn't this putting all my eggs in one basket?"</h4>
<p>Yes, but it's a very secure basket. The alternative - weak or reused passwords - is far more dangerous.</p>

<h4>"What if I lose access to my password manager?"</h4>
<p>Most offer emergency recovery options and secure sharing with trusted family members.</p>`
      },
      { 
        id: '4-3', 
        title: 'Multi-Factor Authentication', 
        completed: false, 
        content: `<h2>Multi-Factor Authentication (MFA)</h2>
<p>Multi-factor authentication adds critical extra layers of security beyond passwords, making it exponentially harder for attackers to access your accounts.</p>

<h3>What is Multi-Factor Authentication?</h3>
<p>MFA requires two or more verification methods from different categories:</p>

<h4>Something You Know</h4>
<ul>
  <li>Password or PIN</li>
  <li>Security question answer</li>
</ul>

<h4>Something You Have</h4>
<ul>
  <li>Phone (SMS code or authenticator app)</li>
  <li>Security key (hardware token)</li>
  <li>Smart card</li>
</ul>

<h4>Something You Are</h4>
<ul>
  <li>Fingerprint</li>
  <li>Face recognition</li>
  <li>Iris scan</li>
</ul>

<h3>Types of MFA Methods</h3>

<h4>1. SMS Text Message Codes</h4>
<p>A code is sent to your phone via text message.</p>
<p><strong>Pros:</strong> Easy to use, widely supported</p>
<p><strong>Cons:</strong> Vulnerable to SIM swapping attacks, not the most secure</p>

<h4>2. Authenticator Apps</h4>
<p>Apps generate time-based codes (TOTP):</p>
<ul>
  <li>Google Authenticator</li>
  <li>Microsoft Authenticator</li>
  <li>Authy</li>
  <li>1Password (built-in)</li>
</ul>
<p><strong>Pros:</strong> More secure than SMS, works offline</p>
<p><strong>Cons:</strong> Need to set up for each service</p>

<h4>3. Hardware Security Keys</h4>
<p>Physical devices like YubiKey or Titan Security Key.</p>
<p><strong>Pros:</strong> Most secure option, phishing-resistant</p>
<p><strong>Cons:</strong> Costs money, need to carry it with you</p>

<h4>4. Biometric Authentication</h4>
<p>Fingerprint, face recognition, or iris scans.</p>
<p><strong>Pros:</strong> Convenient, hard to replicate</p>
<p><strong>Cons:</strong> Cannot be changed if compromised</p>

<h4>5. Push Notifications</h4>
<p>Approve login attempts via notification on trusted device.</p>
<p><strong>Pros:</strong> User-friendly, secure</p>
<p><strong>Cons:</strong> Requires internet connection</p>

<div class="info-box">
<p><strong>Recommendation:</strong> Use authenticator apps or hardware keys when possible. SMS is better than nothing, but not ideal for high-security accounts.</p>
</div>

<h3>Why MFA is Critical</h3>

<h4>Protection Against Phishing</h4>
<p>Even if attackers steal your password through phishing, they cannot access your account without the second factor.</p>

<h4>Defense Against Data Breaches</h4>
<p>If a website is breached and your password is leaked, MFA prevents unauthorized access.</p>

<h4>Statistics</h4>
<ul>
  <li>MFA blocks 99.9% of automated attacks</li>
  <li>Accounts with MFA are 50x less likely to be compromised</li>
</ul>

<h3>Setting Up MFA</h3>
<p>Enable MFA on these critical accounts first:</p>
<ol>
  <li><strong>Email:</strong> Your email is the key to resetting other passwords</li>
  <li><strong>Banking:</strong> Protect your finances</li>
  <li><strong>Social Media:</strong> Prevent identity theft</li>
  <li><strong>Password Manager:</strong> Secure your vault</li>
  <li><strong>Work Accounts:</strong> Protect company data</li>
</ol>

<h3>Backup Codes</h3>
<p>When setting up MFA, services provide backup codes. These are crucial:</p>
<ul>
  <li>Save them in a secure location</li>
  <li>Use them if you lose your phone or security key</li>
  <li>Print and store in a safe place</li>
  <li>Store encrypted in password manager</li>
</ul>

<div class="warning-box">
<p><strong>Critical:</strong> Never share your MFA codes with anyone. Real companies will never ask for your 2FA codes. If someone asks, it's a scam.</p>
</div>

<h3>Common MFA Pitfalls</h3>

<h4>MFA Fatigue Attacks</h4>
<p>Attackers spam push notifications hoping you'll approve one by accident. Never approve unexpected MFA requests!</p>

<h4>SIM Swapping</h4>
<p>Attackers convince your phone carrier to transfer your number to their device, intercepting SMS codes. Use app-based or hardware MFA when possible.</p>

<h4>Backup Method Vulnerability</h4>
<p>Ensure backup authentication methods are also secure - don't use easy security questions.</p>

<h3>Best Practices</h3>
<ul>
  <li>Enable MFA on every account that offers it</li>
  <li>Use authenticator apps or hardware keys over SMS</li>
  <li>Keep backup codes secure</li>
  <li>Never share MFA codes</li>
  <li>Be suspicious of unexpected MFA prompts</li>
  <li>Register multiple authentication devices</li>
</ul>`
      },
    ],
  },
  {
    id: '5',
    title: 'Spear Phishing & Targeted Attacks',
    description: 'Learn about sophisticated, personalized phishing attacks targeting specific individuals or organizations.',
    difficulty: 'Advanced',
    duration: '50 min',
    category: 'Advanced Threats',
    progress: 0,
    status: 'not-started',
    prerequisiteId: '2',
    sections: [
      { 
        id: '5-1', 
        title: 'What is Spear Phishing?', 
        completed: false, 
        content: `<h2>Understanding Spear Phishing</h2>
<p>While regular phishing casts a wide net, spear phishing is a precision strike. These highly targeted attacks use personalized information to appear legitimate and trustworthy.</p>

<h3>Key Characteristics</h3>
<ul>
  <li>Targeted at specific individuals</li>
  <li>Highly personalized content</li>
  <li>Much higher success rate than regular phishing</li>
  <li>Difficult to detect</li>
</ul>`
      },
      { 
        id: '5-2', 
        title: 'Reconnaissance Techniques', 
        completed: false, 
        content: `<h2>How Attackers Gather Intelligence</h2>
<p>Attackers research targets through social media, company websites, and public records to craft convincing attacks.</p>

<h3>Information Sources</h3>
<ul>
  <li>LinkedIn profiles and connections</li>
  <li>Social media posts</li>
  <li>Company websites and press releases</li>
  <li>Public records and databases</li>
</ul>`
      },
      { 
        id: '5-3', 
        title: 'Detection and Response', 
        completed: false, 
        content: `<h2>Detecting and Responding to Spear Phishing</h2>
<p>Even personalized emails require verification. Always confirm unusual requests through independent channels.</p>

<h3>Verification Steps</h3>
<ul>
  <li>Call using a known phone number</li>
  <li>Verify through different communication channel</li>
  <li>Check email headers carefully</li>
  <li>Report suspicious messages immediately</li>
</ul>`
      },
    ],
  },
  {
    id: '6',
    title: 'Mobile Device Security',
    description: 'Protect your smartphone and tablet from phishing, malware, and other mobile threats.',
    difficulty: 'Intermediate',
    duration: '40 min',
    category: 'Mobile Security',
    progress: 0,
    status: 'not-started',
    prerequisiteId: '3',
    sections: [
      { 
        id: '6-1', 
        title: 'Mobile Threat Landscape', 
        completed: false, 
        content: `<h2>Understanding Mobile Security Threats</h2>
<p>Mobile devices face unique security challenges due to their always-connected nature and smaller screens that make threat detection harder.</p>

<h3>Common Mobile Threats</h3>
<ul>
  <li>Smishing (SMS phishing)</li>
  <li>Malicious apps</li>
  <li>Public Wi-Fi attacks</li>
  <li>QR code phishing</li>
</ul>`
      },
      { 
        id: '6-2', 
        title: 'SMS and App-based Phishing', 
        completed: false, 
        content: `<h2>Mobile Phishing Tactics</h2>
<p>Attackers exploit mobile-specific features like SMS, apps, and QR codes to deliver phishing attacks.</p>

<h3>Smishing Examples</h3>
<ul>
  <li>Fake package delivery notifications</li>
  <li>Banking security alerts</li>
  <li>Account verification requests</li>
  <li>Prize and lottery scams</li>
</ul>`
      },
      { 
        id: '6-3', 
        title: 'Mobile Security Best Practices', 
        completed: false, 
        content: `<h2>Securing Your Mobile Device</h2>
<p>Implement strong security measures to protect your mobile device and data.</p>

<h3>Essential Security Settings</h3>
<ul>
  <li>Enable strong screen lock (biometric + PIN)</li>
  <li>Turn on automatic updates</li>
  <li>Use VPN on public Wi-Fi</li>
  <li>Review app permissions regularly</li>
  <li>Enable Find My Device</li>
</ul>`
      },
    ],
  },
];

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first training module',
    icon: 'Trophy',
    rarity: 'Common',
    points: 50,
    earned: true,
    earnedDate: '2025-09-01',
    category: 'Training',
  },
  {
    id: '2',
    name: 'Quiz Master',
    description: 'Score 100% on any quiz',
    icon: 'Award',
    rarity: 'Rare',
    points: 150,
    earned: true,
    earnedDate: '2025-10-15',
    category: 'Training',
  },
  {
    id: '3',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    rarity: 'Rare',
    points: 200,
    earned: true,
    earnedDate: '2026-02-10',
    category: 'Training',
  },
  {
    id: '4',
    name: 'Scanner Specialist',
    description: 'Scan 50 emails or URLs',
    icon: 'Shield',
    rarity: 'Epic',
    points: 300,
    earned: false,
    progress: 38,
    progressMax: 50,
    requirement: 'Scan 50 emails or URLs (38/50)',
    category: 'Security',
  },
  {
    id: '5',
    name: 'Community Guardian',
    description: 'Report 10 phishing attempts',
    icon: 'Users',
    rarity: 'Rare',
    points: 250,
    earned: false,
    progress: 3,
    progressMax: 10,
    requirement: 'Report 10 phishing attempts (3/10)',
    category: 'Community',
  },
  {
    id: '6',
    name: 'Phishing Expert',
    description: 'Complete all advanced modules',
    icon: 'GraduationCap',
    rarity: 'Legendary',
    points: 1000,
    earned: false,
    progress: 0,
    progressMax: 8,
    requirement: 'Complete all 8 advanced modules (0/8)',
    category: 'Expert',
  },
];

// Mock leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'CyberNinja', points: 8450, badges: 42, trend: 'same', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja' },
  { rank: 2, username: 'SecureShield', points: 7820, badges: 38, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecureShield' },
  { rank: 3, username: 'PhishHunter', points: 7340, badges: 35, trend: 'down', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhishHunter' },
  { rank: 4, username: 'ThreatDefender', points: 6890, badges: 33, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThreatDefender' },
  { rank: 5, username: 'InfoSecPro', points: 6520, badges: 31, trend: 'same', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InfoSecPro' },
  { rank: 127, username: 'SecurityPro', points: 1450, badges: 15, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecurityPro' },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Anatomy of a Phishing Email: What to Look For',
    excerpt: 'Learn to dissect phishing emails and identify the telltale signs of malicious intent.',
    content: 'Full article content here...',
    category: 'Email Security',
    readTime: '5 min',
    publishDate: '2026-02-10',
    author: 'Dr. Sarah Chen',
    featured: true,
  },
  {
    id: '2',
    title: 'Top 10 Phishing Scams of 2026',
    excerpt: 'Stay informed about the latest phishing tactics cybercriminals are using this year.',
    content: 'Full article content here...',
    category: 'Threat Intelligence',
    readTime: '8 min',
    publishDate: '2026-02-01',
    author: 'Michael Roberts',
    featured: true,
  },
  {
    id: '3',
    title: 'How to Report Phishing to the Authorities',
    excerpt: 'A step-by-step guide on reporting phishing attempts to help protect others.',
    content: 'Full article content here...',
    category: 'Best Practices',
    readTime: '4 min',
    publishDate: '2026-01-28',
    author: 'Emily Johnson',
    featured: false,
  },
];

// Mock incidents
export const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'email',
    threatLevel: 'high',
    description: 'Fake PayPal security alert requesting account verification',
    content: 'Subject: Urgent - Your PayPal Account Has Been Limited...',
    submittedBy: 'AlertUser123',
    submittedDate: '2026-02-16',
    upvotes: 45,
    verified: true,
    status: 'verified',
    tags: ['Banking', 'Urgent', 'Account Verification'],
  },
  {
    id: '2',
    type: 'url',
    threatLevel: 'high',
    description: 'Microsoft Office 365 fake login page',
    content: 'https://microsofft-login-secure.tk/signin',
    submittedBy: 'PhishSpotter',
    submittedDate: '2026-02-15',
    upvotes: 38,
    verified: true,
    status: 'verified',
    tags: ['Tech Support', 'Credential Theft', 'Office 365'],
  },
  {
    id: '3',
    type: 'sms',
    threatLevel: 'medium',
    description: 'Package delivery SMS with suspicious tracking link',
    content: 'Your package is waiting. Track here: bit.ly/pkg12345',
    submittedBy: 'SafetyFirst',
    submittedDate: '2026-02-14',
    upvotes: 22,
    verified: false,
    status: 'under-review',
    tags: ['Delivery Scam', 'SMS', 'Malicious Link'],
  },
];