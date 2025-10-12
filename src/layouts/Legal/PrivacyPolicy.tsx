import React from 'react';
import SEO from '../../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy - Manifesto Watch"
        description="Privacy Policy for Manifesto Watch. Learn how we collect, use, protect, and manage your personal information."
        canonicalUrl="/privacy-policy"
      />
      
      <div className="container my-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem 1rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3" style={{ color: '#FF4500' }}>Privacy Policy</h1>
              <p className="text-muted" style={{ color: '#aaa' }}>Last Updated: October 12, 2025</p>
            </div>

            {/* Introduction */}
            <section className="mb-5">
              <div className="alert alert-info" role="alert" style={{ backgroundColor: '#d1ecf1', color: '#0c5460', border: '1px solid #bee5eb' }}>
                <h5 className="alert-heading">
                  <i className="fas fa-shield-alt me-2"></i>
                  Your Privacy Matters
                </h5>
                <p className="mb-0">
                  At Manifesto Watch, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>1. Information We Collect</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>A. Information You Provide Directly:</strong></p>
                  <ul>
                    <li><strong>Contact Information:</strong> When you contact us, subscribe to our newsletter, 
                    or create an account, we may collect your name, email address, phone number, and any 
                    other information you choose to provide.</li>
                    <li><strong>Communication Data:</strong> If you send us emails, feedback, or inquiries, 
                    we collect the content of your messages and your contact details.</li>
                    <li><strong>User-Generated Content:</strong> Any comments, posts, or content you submit 
                    to our platform.</li>
                  </ul>
                  
                  <p className="mt-3"><strong>B. Information Collected Automatically:</strong></p>
                  <ul>
                    <li><strong>Device Information:</strong> Device type, operating system, browser type and version</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, 
                    referring/exit pages</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, 
                    and similar technologies to track activity and store information</li>
                  </ul>
                  
                  <p className="mt-3 mb-0"><strong>C. Information from Third Parties:</strong></p>
                  <ul className="mb-0">
                    <li>Analytics providers (e.g., Google Analytics)</li>
                    <li>Social media platforms (if you interact with our social media pages)</li>
                    <li>Publicly available sources for political information and data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>2. How We Use Your Information</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>We use the information we collect for the following purposes:</p>
                  
                  <p><strong>Service Provision:</strong></p>
                  <ul>
                    <li>To provide, operate, and maintain our website and services</li>
                    <li>To deliver requested information, manifestos, and tracking data</li>
                    <li>To process and respond to your inquiries and requests</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Communication:</strong></p>
                  <ul>
                    <li>To send you newsletters, updates, and notifications (with your consent)</li>
                    <li>To respond to your questions and provide customer support</li>
                    <li>To send administrative information and service announcements</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Improvement and Analytics:</strong></p>
                  <ul>
                    <li>To analyze usage patterns and improve our website functionality</li>
                    <li>To understand user preferences and enhance user experience</li>
                    <li>To develop new features and services</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Legal and Safety:</strong></p>
                  <ul className="mb-0">
                    <li>To comply with legal obligations and enforce our Terms of Service</li>
                    <li>To protect against fraud, security breaches, and illegal activities</li>
                    <li>To resolve disputes and enforce our agreements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>3. Cookies and Tracking Technologies</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>What Are Cookies?</strong></p>
                  <p>
                    Cookies are small text files stored on your device that help us provide and improve 
                    our services. We use both session cookies (deleted when you close your browser) and 
                    persistent cookies (remain until deleted or expired).
                  </p>
                  
                  <p className="mt-3"><strong>Types of Cookies We Use:</strong></p>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Advertising Cookies:</strong> May be used to deliver relevant advertisements</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Managing Cookies:</strong></p>
                  <p className="mb-0">
                    You can control and delete cookies through your browser settings. However, disabling 
                    cookies may affect the functionality of our website. Most browsers allow you to:
                  </p>
                  <ul className="mb-0">
                    <li>View what cookies are stored and delete them individually</li>
                    <li>Block third-party cookies</li>
                    <li>Block all cookies</li>
                    <li>Delete all cookies when you close the browser</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>4. How We Share Your Information</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    We do not sell, rent, or trade your personal information. We may share your information 
                    only in the following circumstances:
                  </p>
                  
                  <ul>
                    <li><strong>Service Providers:</strong> Third-party companies that help us operate our 
                    website (hosting, analytics, email delivery) under strict confidentiality agreements</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government 
                    request, or to protect our legal rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or 
                    sale of assets (users will be notified)</li>
                    <li><strong>With Your Consent:</strong> When you explicitly authorize us to share 
                    specific information</li>
                    <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data that 
                    does not identify individual users</li>
                  </ul>
                  
                  <p className="mt-3 mb-0"><strong>Important Note:</strong> We never share your personal 
                  information with political parties, candidates, or political organizations.</p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>5. Data Security</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    We implement appropriate technical and organizational security measures to protect 
                    your personal information:
                  </p>
                  
                  <ul>
                    <li>Encryption of data in transit using SSL/TLS technology</li>
                    <li>Secure servers and database protection</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls limiting who can access personal data</li>
                    <li>Employee training on data protection and privacy</li>
                  </ul>
                  
                  <p className="mt-3 mb-0">
                    <strong>Important:</strong> While we strive to protect your information, no method 
                    of transmission over the internet or electronic storage is 100% secure. We cannot 
                    guarantee absolute security but continuously work to maintain the safety of your data.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>6. Data Retention</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>We retain personal information only for as long as necessary to fulfill the 
                    purposes outlined in this Privacy Policy</li>
                    <li>Account information is retained until you request deletion or account closure</li>
                    <li>Communication records may be kept for customer service and legal compliance purposes</li>
                    <li>Analytics data is typically aggregated and anonymized for long-term storage</li>
                    <li>We may retain certain information as required by law or for legitimate business purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>7. Your Rights and Choices</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>You have the following rights regarding your personal information:</p>
                  
                  <ul>
                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject 
                    to legal requirements)</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails and newsletters at any time</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a structured, 
                    machine-readable format</li>
                    <li><strong>Objection:</strong> Object to the processing of your information for certain purposes</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where consent 
                    was the basis for processing</li>
                  </ul>
                  
                  <p className="mt-3 mb-0">
                    To exercise these rights, please contact us at <strong>privacy@manifestowatch.in</strong>. 
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>8. Children's Privacy</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Our service is not directed to children under the age of 13</li>
                    <li>We do not knowingly collect personal information from children under 13</li>
                    <li>If we discover we have collected information from a child under 13, we will 
                    delete it immediately</li>
                    <li>Parents or guardians who believe their child has provided information to us should 
                    contact us immediately</li>
                    <li>Users between 13-18 should use our service with parental guidance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>9. Third-Party Websites and Services</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Our website may contain links to third-party websites</li>
                    <li>We are not responsible for the privacy practices of third-party sites</li>
                    <li>Third-party sites have their own privacy policies that govern their practices</li>
                    <li>We encourage you to review the privacy policies of any external sites you visit</li>
                    <li>Our Privacy Policy does not apply to third-party websites, even if accessed 
                    through our site</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* International Users */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>10. International Data Transfers</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Our servers and service providers may be located in various countries</li>
                    <li>Your information may be transferred to and processed in countries other than India</li>
                    <li>We ensure appropriate safeguards are in place for international data transfers</li>
                    <li>By using our service, you consent to the transfer of your information to other countries</li>
                    <li>We comply with applicable data protection laws regarding international transfers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Compliance */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>11. Legal Basis and Compliance</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Compliance with Indian Laws:</strong></p>
                  <ul>
                    <li>We comply with the Information Technology Act, 2000 and related rules</li>
                    <li>We follow Information Technology (Reasonable Security Practices and Procedures 
                    and Sensitive Personal Data or Information) Rules, 2011</li>
                    <li>We adhere to guidelines issued by the Ministry of Electronics and Information Technology</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Legal Basis for Processing:</strong></p>
                  <ul className="mb-0">
                    <li><strong>Consent:</strong> You have given clear consent for processing your personal data</li>
                    <li><strong>Contract:</strong> Processing is necessary to fulfill our service to you</li>
                    <li><strong>Legal Obligation:</strong> Processing is required by law</li>
                    <li><strong>Legitimate Interests:</strong> Processing is in our legitimate interests 
                    and does not override your rights</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Do Not Track */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>12. Do Not Track Signals</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p className="mb-0">
                    Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you 
                    do not want to be tracked. Currently, there is no uniform standard for recognizing and 
                    implementing DNT signals. We do not currently respond to DNT signals, but we provide 
                    you with choices about data collection through cookie settings and opt-out mechanisms 
                    described in this policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>13. Changes to This Privacy Policy</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>We may update this Privacy Policy from time to time to reflect changes in our 
                    practices or legal requirements</li>
                    <li>The "Last Updated" date at the top indicates when the policy was last revised</li>
                    <li>We will notify you of significant changes via email or prominent notice on our website</li>
                    <li>Your continued use after changes indicates acceptance of the updated policy</li>
                    <li>We encourage you to review this Privacy Policy periodically</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>14. Contact Us</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    If you have questions, concerns, or requests regarding this Privacy Policy or our 
                    data practices, please contact us:
                  </p>
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>Privacy Inquiries:</strong> privacy@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>General Contact:</strong> contact@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>Data Protection Officer:</strong> dpo@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-globe me-2 text-primary"></i>
                      <strong>Website:</strong> www.manifestowatch.in
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                      <strong>Address:</strong> New Delhi, India
                    </li>
                  </ul>
                  <p className="mb-0 text-muted small">
                    We aim to respond to all privacy-related inquiries within 30 days. For urgent matters, 
                    please mark your email as "URGENT - Privacy Request."
                  </p>
                </div>
              </div>
            </section>

            {/* Grievance Officer */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>15. Grievance Redressal</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    In accordance with Information Technology Act 2000 and rules made thereunder, the 
                    name and contact details of the Grievance Officer are provided below:
                  </p>
                  <ul className="list-unstyled mb-2">
                    <li className="mb-2">
                      <strong>Name:</strong> Grievance Officer - Manifesto Watch
                    </li>
                    <li className="mb-2">
                      <strong>Email:</strong> grievance@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <strong>Response Time:</strong> Grievances will be acknowledged within 24 hours 
                      and resolved within 30 days
                    </li>
                  </ul>
                  <p className="mb-0">
                    If you have any complaints or concerns regarding data privacy, please contact our 
                    Grievance Officer who will address your concerns in accordance with applicable laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Consent Notice */}
            <section className="mb-5">
              <div className="alert alert-warning" role="alert" style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' }}>
                <h5 className="alert-heading">
                  <i className="fas fa-check-circle me-2"></i>
                  Your Consent
                </h5>
                <p className="mb-0">
                  By using Manifesto Watch, you acknowledge that you have read and understood this Privacy 
                  Policy and consent to the collection, use, and disclosure of your information as described 
                  herein. If you do not agree with this policy, please do not use our website.
                </p>
              </div>
            </section>

            {/* Related Links */}
            <div className="text-center mb-4">
              <h5 style={{ color: '#FF4500' }}>Related Documents</h5>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/terms" className="btn btn-outline-light btn-sm">
                  <i className="fas fa-file-contract me-2"></i>Terms of Service
                </a>
                <a href="/disclaimer" className="btn btn-outline-light btn-sm">
                  <i className="fas fa-exclamation-triangle me-2"></i>Disclaimer
                </a>
                <a href="/contact" className="btn btn-outline-light btn-sm">
                  <i className="fas fa-envelope me-2"></i>Contact Us
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <a href="/" className="btn btn-primary btn-lg">
                <i className="fas fa-home me-2"></i>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
