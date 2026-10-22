/**
 * =============================================================================
 * Stav's Birthday - Website Configuration
 * =============================================================================
 * Edit the settings below to update the party website in real-time without
 * needing to modify application code or styles.
 */

const BIRTHDAY_CONFIG = {
  // 1. RAM Fund Percentage (Set manually, currently 25%)
  // Values: 0 to 100
  ramFundPercentage: 12,

  // 2. Google Form URL for Photo & Name Submissions
  // Paste your published Google Form link here:
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSedtJd1sB7jvB6HA25iG7m_sgcpgEPefhrl6ujeN9YaYTI8vA/viewform?usp=dialog",

  // 3. Intro Photo Path (Path to photo file, e.g. "images/last-year.jpg". Leave empty for placeholder)
  introPhotoUrl: "",

  // 4. RAM Image Path
  // Path to your mascot image file:
  ramImageUrl: "resources/ram.png",

  // 5. Contributor List
  // Add contributors as friends chip in.
  // Example entry:
  //   { name: "<FRIEND NAME>", persona: "<CHILDHOOD PERSONA>", status: "<STATUS LABEL>" },
  contributors: [
    // Currently empty as requested!
  ]
};

// Make config globally accessible in browser environments
if (typeof window !== "undefined") {
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}

// Export for Node/CommonJS test environments if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = BIRTHDAY_CONFIG;
}
