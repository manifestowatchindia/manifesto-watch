import React from 'react';
import SEO from '../../components/SEO';

export const TermsOfService: React.FC = () => {
  return (
    <>
      <SEO 
        title="Terms of Service - Manifesto Watch"
        description="Terms of Service for Manifesto Watch. Read our terms and conditions, user agreements, and usage policies."
        canonicalUrl="/terms"
      />
      
      <div className="container my-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem 1rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3" style={{ color: '#FF4500' }}>Terms of Service</h1>
              <p className="text-muted" style={{ color: '#aaa' }}>Last Updated: October 12, 2025</p>
            </div>

            {/* Introduction */}
            <section className="mb-5">
              <div className="alert alert-info" role="alert" style={{ backgroundColor: '#d1ecf1', color: '#0c5460', border: '1px solid #bee5eb' }}>
                <h5 className="alert-heading">
                  <i className="fas fa-info-circle me-2"></i>
                  Welcome to Manifesto Watch
                </h5>
                <p className="mb-0">
                  These Terms of Service ("Terms") govern your access to and use of Manifesto Watch 
                  ("the Website", "our service"). By accessing or using our Website, you agree to be 
                  bound by these Terms. If you do not agree to these Terms, please do not use our Website.
                </p>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>1. Acceptance of Terms</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    By accessing and using Manifesto Watch, you accept and agree to be bound by the 
                    terms and provision of this agreement. Additionally, when using particular services, 
                    you shall be subject to any posted guidelines or rules applicable to such services.
                  </p>
                  <ul className="mb-0">
                    <li>You must be at least 13 years old to use this service</li>
                    <li>You agree to provide accurate and complete information</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to accept responsibility for all activities under your account</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Use of Service */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>2. Use of Service</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Permitted Use:</strong></p>
                  <ul>
                    <li>Access and use the Website for informational and educational purposes</li>
                    <li>View, download, and share content for personal, non-commercial use</li>
                    <li>Engage with interactive features in a lawful manner</li>
                    <li>Subscribe to newsletters and updates</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Prohibited Use:</strong></p>
                  <p>You agree NOT to:</p>
                  <ul className="mb-0">
                    <li>Use the service for any illegal purpose or in violation of any laws</li>
                    <li>Attempt to gain unauthorized access to our systems or networks</li>
                    <li>Transmit any viruses, malware, or harmful code</li>
                    <li>Harass, abuse, or harm other users or third parties</li>
                    <li>Impersonate any person or entity</li>
                    <li>Collect or harvest information from the Website using automated means</li>
                    <li>Post false, misleading, or defamatory content</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Use the service for commercial purposes without authorization</li>
                    <li>Remove or modify any copyright or proprietary notices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Accounts */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>3. User Accounts and Registration</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    If we offer user registration or account creation features in the future, you agree to:
                  </p>
                  <ul>
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                  </ul>
                  <p className="mb-0">
                    We reserve the right to suspend or terminate accounts that violate these Terms or 
                    for any other reason at our sole discretion.
                  </p>
                </div>
              </div>
            </section>

            {/* Content and Intellectual Property */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>4. Content and Intellectual Property</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Our Content:</strong></p>
                  <ul>
                    <li>All content on Manifesto Watch, including text, graphics, logos, images, and 
                    software, is our property or licensed to us</li>
                    <li>Content is protected by Indian and international copyright laws</li>
                    <li>You may not reproduce, distribute, or create derivative works without permission</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Third-Party Content:</strong></p>
                  <ul>
                    <li>Political manifestos, party logos, and symbols are the property of respective 
                    political parties</li>
                    <li>Government data and statistics are used under fair use principles</li>
                    <li>We respect all intellectual property rights and expect users to do the same</li>
                  </ul>
                  
                  <p className="mt-3 mb-0"><strong>User-Generated Content:</strong></p>
                  <p className="mb-0">
                    If you submit, post, or display content on our Website (comments, feedback, etc.), 
                    you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, 
                    and display such content in connection with our service.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>5. Privacy and Data Protection</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    Your privacy is important to us. Our collection and use of personal information is 
                    governed by our Privacy Policy. By using our service, you consent to:
                  </p>
                  <ul className="mb-0">
                    <li>The collection and use of information as described in our Privacy Policy</li>
                    <li>The use of cookies and similar tracking technologies</li>
                    <li>Receiving communications from us (with opt-out options provided)</li>
                    <li>Our data practices in accordance with applicable laws including the Information 
                    Technology Act, 2000</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Disclaimers and Limitations */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>6. Disclaimers and Limitations of Liability</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Service "AS IS":</strong></p>
                  <p>
                    The service is provided "as is" and "as available" without warranties of any kind, 
                    either express or implied, including but not limited to warranties of merchantability, 
                    fitness for a particular purpose, or non-infringement.
                  </p>
                  
                  <p className="mt-3"><strong>No Warranty:</strong></p>
                  <ul>
                    <li>We do not warrant that the service will be uninterrupted or error-free</li>
                    <li>We do not warrant the accuracy, completeness, or reliability of content</li>
                    <li>We do not guarantee that defects will be corrected</li>
                    <li>We do not warrant that the service is free from viruses or harmful components</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Limitation of Liability:</strong></p>
                  <p className="mb-0">
                    To the fullest extent permitted by law, Manifesto Watch shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, or any loss of 
                    profits or revenues, whether incurred directly or indirectly, or any loss of data, 
                    use, goodwill, or other intangible losses resulting from your use of the service.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Links and Services */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>7. Third-Party Links and Services</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Our Website may contain links to third-party websites or services</li>
                    <li>We are not responsible for the content, privacy policies, or practices of 
                    third-party sites</li>
                    <li>Links do not imply endorsement of the linked site or its content</li>
                    <li>You access third-party sites at your own risk</li>
                    <li>We recommend reviewing the terms and privacy policies of any third-party sites</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Indemnification */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>8. Indemnification</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p className="mb-0">
                    You agree to indemnify, defend, and hold harmless Manifesto Watch, its owners, 
                    operators, employees, agents, and affiliates from and against any and all claims, 
                    damages, obligations, losses, liabilities, costs, or debt, and expenses (including 
                    attorney's fees) arising from:
                  </p>
                  <ul className="mt-2 mb-0">
                    <li>Your use of and access to the service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights, including intellectual property rights</li>
                    <li>Any content you submit or post on the service</li>
                    <li>Any harm caused to any third party through your use of the service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>9. Termination</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Our Rights:</strong></p>
                  <ul>
                    <li>We may terminate or suspend your access immediately, without prior notice, for 
                    any reason, including breach of these Terms</li>
                    <li>We reserve the right to modify or discontinue the service at any time</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Effect of Termination:</strong></p>
                  <ul className="mb-0">
                    <li>Upon termination, your right to use the service will immediately cease</li>
                    <li>All provisions that should survive termination shall survive, including ownership 
                    provisions, warranty disclaimers, and limitations of liability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>10. Dispute Resolution and Governing Law</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Governing Law:</strong></p>
                  <ul>
                    <li>These Terms shall be governed by and construed in accordance with the laws of India</li>
                    <li>Applicable laws include the Information Technology Act, 2000 and related rules</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Jurisdiction:</strong></p>
                  <ul>
                    <li>Any disputes arising from these Terms or use of the service shall be subject to 
                    the exclusive jurisdiction of the courts in New Delhi, India</li>
                  </ul>
                  
                  <p className="mt-3 mb-0"><strong>Dispute Resolution Process:</strong></p>
                  <ul className="mb-0">
                    <li>Before filing any legal action, we encourage users to contact us to resolve 
                    disputes informally</li>
                    <li>We are committed to resolving disputes fairly and promptly</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>11. Changes to Terms of Service</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>We reserve the right to modify these Terms at any time</li>
                    <li>Changes will be effective immediately upon posting to the Website</li>
                    <li>We will update the "Last Updated" date at the top of this page</li>
                    <li>Continued use of the service after changes constitutes acceptance of the new Terms</li>
                    <li>We encourage you to review these Terms periodically</li>
                    <li>For significant changes, we may provide additional notice via email or Website banner</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Communication */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>12. Communications and Notifications</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>By using our service, you consent to receive communications from us including:</p>
                  <ul>
                    <li>Service-related announcements and updates</li>
                    <li>Responses to your inquiries</li>
                    <li>Newsletter and promotional content (with opt-out options)</li>
                    <li>Legal notices and policy updates</li>
                  </ul>
                  <p className="mb-0">
                    Communications will be delivered via email, Website notifications, or other reasonable means.
                  </p>
                </div>
              </div>
            </section>

            {/* Severability */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>13. Severability and Waiver</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p><strong>Severability:</strong></p>
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid, that 
                    provision shall be limited or eliminated to the minimum extent necessary so that 
                    these Terms shall otherwise remain in full force and effect.
                  </p>
                  
                  <p className="mt-3 mb-0"><strong>Waiver:</strong></p>
                  <p className="mb-0">
                    Our failure to enforce any right or provision of these Terms will not be considered 
                    a waiver of those rights.
                  </p>
                </div>
              </div>
            </section>

            {/* Entire Agreement */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>14. Entire Agreement</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p className="mb-0">
                    These Terms of Service, together with our Privacy Policy and Disclaimer, constitute 
                    the entire agreement between you and Manifesto Watch regarding the use of our service, 
                    superseding any prior agreements between you and us relating to your use of the service.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>15. Contact Information</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>General Inquiries:</strong> contact@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>Legal Matters:</strong> legal@manifestowatch.in
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
                  <p className="mt-3 mb-0 text-muted small">
                    We aim to respond to all inquiries within 7-10 business days.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance Notice */}
            <section className="mb-5">
              <div className="alert alert-warning" role="alert" style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' }}>
                <h5 className="alert-heading">
                  <i className="fas fa-check-circle me-2"></i>
                  Your Acceptance of These Terms
                </h5>
                <p className="mb-0">
                  By using Manifesto Watch, you signify your acceptance of these Terms of Service. 
                  If you do not agree to these Terms, please do not use our service. Your continued 
                  use following the posting of changes to these Terms will mean that you accept those changes.
                </p>
              </div>
            </section>

            {/* Related Links */}
            <div className="text-center mb-4">
              <h5 style={{ color: '#FF4500' }}>Related Documents</h5>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/privacy-policy" className="btn btn-outline-light btn-sm">
                  <i className="fas fa-shield-alt me-2"></i>Privacy Policy
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
