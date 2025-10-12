import React from 'react';
import SEO from '../../components/SEO';

export const Disclaimer: React.FC = () => {
  return (
    <>
      <SEO 
        title="Disclaimer - Manifesto Watch"
        description="Legal disclaimer for Manifesto Watch platform. Read our terms of use, limitations of liability, and important legal notices."
        canonicalUrl="/disclaimer"
      />
      
      <div className="container my-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem 1rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3" style={{ color: '#FF4500' }}>Legal Disclaimer</h1>
              <p className="text-muted" style={{ color: '#aaa' }}>Last Updated: October 12, 2025</p>
            </div>

            {/* Introduction */}
            <section className="mb-5">
              <div className="alert alert-warning" role="alert" style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' }}>
                <h5 className="alert-heading">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Important Notice
                </h5>
                <p className="mb-0">
                  Please read this disclaimer carefully before using the Manifesto Watch website. 
                  By accessing or using this website, you acknowledge that you have read, understood, 
                  and agree to be bound by this disclaimer.
                </p>
              </div>
            </section>

            {/* General Disclaimer */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: '#FF4500' }}>1. General Disclaimer</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body">
                  <p>
                    The information provided on Manifesto Watch ("the Website") is for general informational 
                    and educational purposes only. All information on the Website is provided in good faith; 
                    however, we make no representation or warranty of any kind, express or implied, regarding 
                    the accuracy, adequacy, validity, reliability, availability, or completeness of any 
                    information on the Website.
                  </p>
                  <p className="mb-0">
                    Under no circumstance shall we have any liability to you for any loss or damage of any 
                    kind incurred as a result of the use of the Website or reliance on any information 
                    provided on the Website. Your use of the Website and your reliance on any information 
                    on the Website is solely at your own risk.
                  </p>
                </div>
              </div>
            </section>

            {/* Independent Platform */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>2. Independence and Non-Affiliation</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li className="mb-2">
                      <strong>Political Independence:</strong> Manifesto Watch is an independent platform 
                      and is NOT affiliated with, endorsed by, sponsored by, or in any way associated with 
                      any political party, government body, candidate, or political organization in India 
                      or elsewhere.
                    </li>
                    <li className="mb-2">
                      <strong>No Political Bias:</strong> We do not support, endorse, or oppose any political 
                      party, candidate, or political ideology. Our goal is to provide neutral, factual 
                      information for public awareness.
                    </li>
                    <li className="mb-2">
                      <strong>Non-Partisan Analysis:</strong> Any analysis, comparison, or tracking of 
                      political promises is conducted objectively based on publicly available information 
                      and does not reflect any political preference or bias.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Accuracy */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>3. Information Accuracy and Sources</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p><strong>Data Sources:</strong></p>
                  <ul>
                    <li>All information is compiled from publicly available sources including official 
                    government websites, Election Commission of India, political party manifestos, 
                    press releases, and credible news sources.</li>
                    <li>We strive to ensure accuracy but cannot guarantee that all information is 
                    current, complete, or error-free.</li>
                    <li>Political manifestos and documents are reproduced as published by respective 
                    political parties.</li>
                  </ul>
                  
                  <p><strong>No Warranty:</strong></p>
                  <ul className="mb-0">
                    <li>We make no warranties or representations about the accuracy or completeness 
                    of the Website's content.</li>
                    <li>Information may become outdated, and we are not obligated to update it.</li>
                    <li>Users are encouraged to verify information independently from official sources.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* No Professional Advice */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>4. No Professional or Legal Advice</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p className="mb-3">
                    The content on this Website does not constitute professional advice and should not 
                    be used as a substitute for consultation with professional advisors.
                  </p>
                  <ul className="mb-0">
                    <li>This Website does not provide legal, political, or professional advice.</li>
                    <li>The information is not intended to influence voting behavior or political decisions.</li>
                    <li>Users should conduct their own research and due diligence before making any 
                    decisions based on information from this Website.</li>
                    <li>We are not responsible for any decisions made based on information provided 
                    on this Website.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Copyright and Intellectual Property */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>5. Copyright and Intellectual Property</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li className="mb-2">
                      <strong>Third-Party Content:</strong> All political manifestos, party logos, 
                      symbols, and related content are the intellectual property of their respective 
                      political parties and organizations.
                    </li>
                    <li className="mb-2">
                      <strong>Fair Use:</strong> We reproduce such content under the principles of 
                      fair use for informational, educational, and public interest purposes.
                    </li>
                    <li className="mb-2">
                      <strong>No Infringement Intended:</strong> If any content owner believes their 
                      intellectual property rights have been infringed, please contact us immediately 
                      for prompt resolution.
                    </li>
                    <li className="mb-2">
                      <strong>Public Domain:</strong> Government data, statistics, and official 
                      information are assumed to be in the public domain and are used accordingly.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* External Links */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>6. External Links Disclaimer</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p>
                    The Website may contain links to external websites that are not provided or 
                    maintained by or in any way affiliated with Manifesto Watch.
                  </p>
                  <ul className="mb-0">
                    <li>We do not guarantee the accuracy, relevance, timeliness, or completeness 
                    of any information on external websites.</li>
                    <li>Links to external websites do not constitute an endorsement of those sites 
                    or their content.</li>
                    <li>We are not responsible for the content, privacy policies, or practices of 
                    external websites.</li>
                    <li>Users access external links at their own risk.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>7. Limitation of Liability</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p>
                    To the fullest extent permitted by applicable law, Manifesto Watch, its owners, 
                    operators, employees, agents, and affiliates shall not be liable for:
                  </p>
                  <ul>
                    <li>Any direct, indirect, incidental, consequential, or punitive damages arising 
                    from your use of or inability to use the Website.</li>
                    <li>Any errors, omissions, or inaccuracies in the content.</li>
                    <li>Any loss or damage resulting from reliance on information from the Website.</li>
                    <li>Any unauthorized access to or use of our servers and/or any personal 
                    information stored therein.</li>
                    <li>Any interruption or cessation of transmission to or from the Website.</li>
                    <li>Any bugs, viruses, trojan horses, or similar that may be transmitted to or 
                    through the Website.</li>
                  </ul>
                  <p className="mb-0">
                    <strong>This limitation applies even if we have been advised of the possibility 
                    of such damages.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* No Defamation Intent */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>8. No Defamation or Malicious Intent</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li className="mb-2">
                      All content is published in good faith and for lawful public interest purposes.
                    </li>
                    <li className="mb-2">
                      We do not intend to defame, harm, or malign any individual, political party, 
                      religion, ethnic group, organization, company, or any other entity.
                    </li>
                    <li className="mb-2">
                      Any resemblance to specific individuals or entities is purely factual and based 
                      on publicly available information.
                    </li>
                    <li className="mb-2">
                      If any content is found to be inaccurate or objectionable, please notify us 
                      immediately for correction or removal.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Conduct */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>9. User Conduct and Responsibility</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p>Users of this Website agree to:</p>
                  <ul className="mb-0">
                    <li>Use the Website only for lawful purposes and in accordance with applicable laws.</li>
                    <li>Not use the Website to spread misinformation, hate speech, or inflammatory content.</li>
                    <li>Not attempt to manipulate, misrepresent, or misuse information from the Website.</li>
                    <li>Respect the intellectual property rights of all parties.</li>
                    <li>Not engage in any activity that could harm, disable, or impair the Website.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>10. Data Protection and Privacy</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>We are committed to protecting user privacy in accordance with applicable 
                    data protection laws.</li>
                    <li>Please refer to our Privacy Policy for detailed information on how we collect, 
                    use, and protect your data.</li>
                    <li>We do not sell or share personal information with third parties for 
                    commercial purposes.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Indemnification */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>11. Indemnification</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p className="mb-0">
                    You agree to indemnify, defend, and hold harmless Manifesto Watch, its owners, 
                    operators, employees, agents, and affiliates from and against any and all claims, 
                    liabilities, damages, losses, costs, expenses, or fees (including reasonable 
                    attorneys' fees) arising from your use of the Website or violation of these terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>12. Governing Law and Jurisdiction</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>This disclaimer and your use of the Website shall be governed by and construed 
                    in accordance with the laws of India.</li>
                    <li>Any disputes arising from the use of this Website shall be subject to the 
                    exclusive jurisdiction of the courts in New Delhi, India.</li>
                    <li>We comply with all applicable laws including but not limited to the Information 
                    Technology Act, 2000, and related rules.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Changes to Disclaimer */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>13. Changes to This Disclaimer</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p className="mb-0">
                    We reserve the right to modify this disclaimer at any time without prior notice. 
                    Changes will be effective immediately upon posting to the Website. Your continued 
                    use of the Website after any changes constitutes acceptance of the modified disclaimer. 
                    Please review this page periodically for updates.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-5">
              <h2 className="h3 mb-3" style={{ color: "#FF4500" }}>14. Contact Information</h2>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                <div className="card-body">
                  <p>
                    If you have any questions, concerns, or complaints regarding this disclaimer or 
                    the content on the Website, please contact us:
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>Email:</strong> legal@manifestowatch.in
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>General Contact:</strong> contact@manifestowatch.in
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

            {/* Acceptance */}
            <section className="mb-5">
              <div className="alert alert-info" role="alert" style={{ backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }}>
                <h5 className="alert-heading">
                  <i className="fas fa-check-circle me-2"></i>
                  Acceptance of Terms
                </h5>
                <p className="mb-0">
                  By using Manifesto Watch, you acknowledge that you have read this disclaimer, 
                  understand it, and agree to be bound by its terms. If you do not agree with any 
                  part of this disclaimer, please do not use the Website.
                </p>
              </div>
            </section>

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



