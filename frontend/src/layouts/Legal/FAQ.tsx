import React, { useState } from 'react';
import SEO from '../../components/SEO';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "About Manifesto Watch",
      questions: [
        {
          question: "What is Manifesto Watch?",
          answer: "Manifesto Watch is India's premier independent platform dedicated to tracking political promises and government accountability. We provide comprehensive analysis of election manifestos, real-time progress tracking of promises, and transparent information about political commitments made during elections. Our mission is to empower citizens with factual information to make informed decisions."
        },
        {
          question: "Is Manifesto Watch affiliated with any political party?",
          answer: "No, Manifesto Watch is completely independent and non-partisan. We are NOT affiliated with, endorsed by, or connected to any political party, government body, candidate, or political organization. Our goal is to provide neutral, factual information for public awareness and accountability."
        },
        {
          question: "Who runs Manifesto Watch?",
          answer: "Manifesto Watch is operated by an independent team of researchers, analysts, and technology professionals committed to transparency in Indian politics. We are not funded by or associated with any political entity. Our work is driven by the belief that informed citizens are essential for a healthy democracy."
        },
        {
          question: "How is Manifesto Watch funded?",
          answer: "We maintain our independence through sustainable funding models that do not compromise our neutrality. We do not accept funding from political parties or organizations. Details about our funding and operations are available in our About Us section."
        }
      ]
    },
    {
      category: "Using the Platform",
      questions: [
        {
          question: "How do I search for manifestos?",
          answer: "You can browse manifestos through two main sections: 'Central Government' for Lok Sabha election manifestos and 'States & UTs' for state legislative assembly manifestos. Use the navigation menu to access these sections. You can filter by political party, election year, and category to find specific manifestos."
        },
        {
          question: "How do I track promise fulfillment?",
          answer: "Visit our 'Tracking' section where you can see the progress of government promises. We categorize promises into 'Fulfilled', 'In Progress', 'Not Started', and 'Broken'. Each promise includes detailed information about the commitment, timeline, current status, and supporting evidence."
        },
        {
          question: "Can I compare manifestos from different parties?",
          answer: "Currently, we provide individual manifesto information for each party. Comparison features are being developed and will be available in future updates. You can manually review different party manifestos to make your own comparisons."
        },
        {
          question: "How often is the information updated?",
          answer: "We update our database regularly. Promise tracking status is reviewed and updated monthly. New manifestos are added as soon as they are officially released by political parties. News and updates sections are refreshed daily with relevant political developments."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Currently, Manifesto Watch is accessible through web browsers on all devices including mobile phones and tablets. The website is fully responsive and optimized for mobile viewing. We are exploring the development of dedicated mobile applications for future releases."
        }
      ]
    },
    {
      category: "Data and Accuracy",
      questions: [
        {
          question: "Where does Manifesto Watch get its data?",
          answer: "All our data comes from publicly available, credible sources including: official government websites, Election Commission of India, published political party manifestos, official press releases, government reports and statistics, and verified news sources from established media outlets. We maintain strict verification standards for all information."
        },
        {
          question: "How do you verify the accuracy of information?",
          answer: "We follow a rigorous verification process: cross-referencing multiple credible sources, verifying against official government data, reviewing original manifesto documents, tracking official announcements and government notifications, and regular fact-checking by our research team. Despite our efforts, if you find any inaccuracies, please report them to us immediately."
        },
        {
          question: "Can I trust the promise tracking data?",
          answer: "We strive for maximum accuracy and objectivity in tracking promises. Our assessments are based on verifiable government actions, official announcements, and measurable outcomes. However, we encourage users to verify information independently and review our cited sources. Our methodology for tracking is transparent and available for review."
        },
        {
          question: "What if I find incorrect information?",
          answer: "We welcome corrections and feedback. If you identify any inaccuracies, please contact us at contact@manifestowatch.in with details and supporting evidence. We review all reports promptly and make necessary corrections. We are committed to maintaining the highest standards of accuracy."
        },
        {
          question: "How do you determine if a promise is fulfilled or broken?",
          answer: "Our methodology considers: official government announcements and notifications, legislative actions and policy implementations, measurable outcomes and statistics, timeline commitments made in manifestos, and expert analysis and verification. We provide detailed reasoning and evidence for each status classification."
        }
      ]
    },
    {
      category: "Privacy and Security",
      questions: [
        {
          question: "Is my personal information safe?",
          answer: "Yes, we take data security seriously. We implement industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits. We do not sell or share your personal information with third parties. For detailed information, please review our Privacy Policy."
        },
        {
          question: "What information do you collect?",
          answer: "We collect minimal information necessary to provide our services. This includes: basic usage analytics (pages visited, time spent), optional email addresses for newsletter subscriptions, and technical information like browser type and IP address for security purposes. You can opt out of non-essential data collection at any time."
        },
        {
          question: "Do you use cookies?",
          answer: "Yes, we use cookies to enhance your browsing experience and analyze website traffic. Essential cookies are necessary for the website to function. Analytics cookies help us improve our services. You can manage cookie preferences through your browser settings. More details are available in our Privacy Policy."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you have the right to request deletion of your account and associated data. Contact us at privacy@manifestowatch.in with your request. We will process account deletion within 30 days, subject to any legal requirements for data retention."
        }
      ]
    },
    {
      category: "Content and Features",
      questions: [
        {
          question: "Which political parties are covered?",
          answer: "We cover all major national and regional political parties that contest elections in India. This includes parties like BJP, Congress, AAP, TMC, DMK, AIADMK, SP, BSP, JD(U), BJD, TRS, and many others. We continually expand coverage to include emerging parties and regional players."
        },
        {
          question: "Can I download manifestos?",
          answer: "Where available and legally permissible, we provide links to official manifesto documents published by political parties. Some manifestos may be available for download directly from our platform. We respect copyright and intellectual property rights of all political parties."
        },
        {
          question: "Do you cover local elections?",
          answer: "Currently, we primarily focus on national (Lok Sabha) and state legislative assembly elections. Coverage of local elections (municipal, panchayat) is being explored for future implementation based on resource availability and user demand."
        },
        {
          question: "Can I contribute or submit information?",
          answer: "We appreciate community engagement! While we maintain editorial control to ensure accuracy, you can: report inaccuracies, suggest improvements, share relevant news and updates, and provide feedback on features. Contact us at contact@manifestowatch.in to contribute."
        },
        {
          question: "Is the content available in regional languages?",
          answer: "Currently, our platform is primarily in English. We are working on adding support for major Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and others. This is a priority feature for future releases to make political information accessible to all Indians."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "The website is not loading properly. What should I do?",
          answer: "Try these troubleshooting steps: refresh the page (Ctrl+F5 or Cmd+Shift+R), clear your browser cache and cookies, try a different web browser, check your internet connection, disable browser extensions temporarily, and try accessing from a different device. If issues persist, contact our support team."
        },
        {
          question: "Which browsers are supported?",
          answer: "Manifesto Watch works best on modern browsers including: Google Chrome (latest version), Mozilla Firefox (latest version), Safari (latest version), Microsoft Edge (latest version), and Opera (latest version). We recommend keeping your browser updated for the best experience and security."
        },
        {
          question: "Why am I getting a security warning?",
          answer: "Our website uses SSL encryption (HTTPS) for security. If you see a security warning, ensure you're accessing https://www.manifestowatch.in (with 'https'). If the warning persists, your antivirus or network might be blocking the connection. Contact us if you continue to experience issues."
        },
        {
          question: "Can I access the website from outside India?",
          answer: "Yes, Manifesto Watch is accessible globally. Anyone interested in Indian politics and governance can access our platform from anywhere in the world. Some features might have geo-specific optimizations for Indian users."
        }
      ]
    },
    {
      category: "Engagement and Contact",
      questions: [
        {
          question: "How can I stay updated with new manifestos and tracking data?",
          answer: "Subscribe to our newsletter for regular updates. Follow us on social media (Twitter, Facebook, LinkedIn, Instagram) for daily updates. Visit our News section for the latest political developments. Enable browser notifications for important updates."
        },
        {
          question: "How do I contact Manifesto Watch?",
          answer: "You can reach us through multiple channels: Email: contact@manifestowatch.in for general inquiries, privacy@manifestowatch.in for privacy matters, legal@manifestowatch.in for legal issues. Use our Contact Us form on the website. Connect with us on social media platforms."
        },
        {
          question: "Can I share Manifesto Watch content on social media?",
          answer: "Yes! We encourage sharing our content to promote political awareness and accountability. You can share pages, manifestos, and tracking information on social media platforms. Please attribute the source when sharing and maintain the integrity of the information."
        },
        {
          question: "Do you have a newsletter?",
          answer: "Yes, we offer a free newsletter with regular updates on new manifestos, promise tracking updates, political analysis, and important election-related information. Subscribe through our website footer by entering your email address. You can unsubscribe at any time."
        },
        {
          question: "How can I provide feedback or suggestions?",
          answer: "We value your feedback! Contact us at contact@manifestowatch.in with your suggestions, feature requests, or general feedback. We review all submissions and consider them for platform improvements. Your input helps us serve the community better."
        }
      ]
    },
    {
      category: "Legal and Compliance",
      questions: [
        {
          question: "Is it legal to track political promises?",
          answer: "Yes, absolutely. Tracking public commitments made by elected representatives is a fundamental aspect of democratic accountability. All information we use is from publicly available sources. We operate within the framework of Indian laws including the Right to Information Act."
        },
        {
          question: "What if a political party objects to their information being tracked?",
          answer: "We only publish information that political parties have made publicly available through their manifestos and official statements. Tracking public commitments is essential for democratic accountability. We are open to dialogue with any party regarding factual accuracy and will correct any proven inaccuracies."
        },
        {
          question: "Do you comply with Indian data protection laws?",
          answer: "Yes, we fully comply with the Information Technology Act, 2000 and related rules including IT (Reasonable Security Practices) Rules, 2011. We have appointed a Grievance Officer as required by law. Our Privacy Policy outlines our compliance with data protection regulations."
        },
        {
          question: "Can I use Manifesto Watch data for research?",
          answer: "Yes, researchers, academics, and journalists can use our publicly available information for non-commercial research purposes. We encourage attribution when using our data. For bulk data access or commercial use, please contact us at legal@manifestowatch.in for permissions."
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions | Manifesto Watch"
        description="Find answers to common questions about Manifesto Watch, tracking political promises, data accuracy, privacy, and how to use our platform."
        canonicalUrl="/faq"
      />
      
      <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="display-4 mb-3" style={{ color: '#FF4500' }}>
                  <i className="fas fa-question-circle me-3"></i>
                  Frequently Asked Questions
                </h1>
                <p className="lead text-muted" style={{ color: '#aaa' }}>
                  Find answers to common questions about Manifesto Watch
                </p>
              </div>

              {/* Search Box */}
              <div className="mb-5">
                <div className="input-group input-group-lg">
                  <span className="input-group-text" style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}>
                    <i className="fas fa-search"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for answers..."
                    style={{ 
                      backgroundColor: '#1a1a1a', 
                      borderColor: '#333', 
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <p className="text-muted small mt-2" style={{ color: '#888' }}>
                  Can't find what you're looking for? <a href="/contact" style={{ color: '#FF4500' }}>Contact us</a>
                </p>
              </div>

              {/* FAQ Categories */}
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-5">
                  <h2 className="h3 mb-4" style={{ color: '#FF4500', borderBottom: '2px solid #FF4500', paddingBottom: '0.5rem' }}>
                    <i className="fas fa-folder-open me-2"></i>
                    {category.category}
                  </h2>
                  
                  <div className="accordion" id={`accordion-${categoryIndex}`}>
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isActive = activeIndex === globalIndex;
                      
                      return (
                        <div 
                          key={faqIndex} 
                          className="mb-3"
                          style={{ 
                            backgroundColor: '#1a1a1a', 
                            border: '1px solid #333',
                            borderRadius: '8px',
                            overflow: 'hidden'
                          }}
                        >
                          <h3 className="mb-0">
                            <button
                              className="btn btn-link w-100 text-start d-flex justify-content-between align-items-center"
                              type="button"
                              onClick={() => toggleAccordion(globalIndex)}
                              style={{
                                color: isActive ? '#FF4500' : '#fff',
                                textDecoration: 'none',
                                padding: '1.25rem',
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <span>
                                <i className={`fas fa-${isActive ? 'minus' : 'plus'}-circle me-3`} style={{ color: '#FF4500' }}></i>
                                {faq.question}
                              </span>
                              <i className={`fas fa-chevron-${isActive ? 'up' : 'down'}`} style={{ fontSize: '0.9rem' }}></i>
                            </button>
                          </h3>
                          
                          <div style={{ 
                            maxHeight: isActive ? '1000px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease'
                          }}>
                            <div 
                              className="p-4" 
                              style={{ 
                                backgroundColor: '#0d0d0d',
                                borderTop: isActive ? '1px solid #333' : 'none',
                                color: '#ccc',
                                lineHeight: '1.8'
                              }}
                            >
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Contact CTA */}
              <div className="text-center mt-5 p-5" style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
                <i className="fas fa-headset fa-3x mb-3" style={{ color: '#FF4500' }}></i>
                <h3 className="mb-3" style={{ color: '#fff' }}>Still Have Questions?</h3>
                <p className="mb-4" style={{ color: '#aaa' }}>
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="/contact" className="btn btn-primary btn-lg">
                    <i className="fas fa-envelope me-2"></i>
                    Contact Support
                  </a>
                  <a href="/" className="btn btn-outline-light btn-lg">
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center mt-4">
                <h5 className="mb-3" style={{ color: '#FF4500' }}>Helpful Resources</h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="/about" className="btn btn-outline-light btn-sm">
                    <i className="fas fa-info-circle me-2"></i>About Us
                  </a>
                  <a href="/privacy-policy" className="btn btn-outline-light btn-sm">
                    <i className="fas fa-shield-alt me-2"></i>Privacy Policy
                  </a>
                  <a href="/terms" className="btn btn-outline-light btn-sm">
                    <i className="fas fa-file-contract me-2"></i>Terms of Service
                  </a>
                  <a href="/disclaimer" className="btn btn-outline-light btn-sm">
                    <i className="fas fa-exclamation-triangle me-2"></i>Disclaimer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
