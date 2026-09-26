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
  ramFundPercentage: 25,

  // 2. Google Form URL for Photo & Name Submissions
  // Paste your published Google Form link here:
  googleFormUrl: "https://forms.google.com",

  // 3. Intro Photo Path (Path to photo file, e.g. "images/last-year.jpg". Leave empty for placeholder)
  introPhotoUrl: "",

  // 4. RAM Image Path
  // Path to your mascot image file:
  ramImageUrl: "ram.png",

  // 4. Milestone Markers displayed under the RAM mascot
  milestones: [
    { percent: 25, label: "<MILESTONE 1 LABEL>" },
    { percent: 50, label: "<MILESTONE 2 LABEL>" },
    { percent: 75, label: "<MILESTONE 3 LABEL>" },
    { percent: 100, label: "<MILESTONE 4 LABEL>" }
  ],

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
