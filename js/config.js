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

  // 3. RAM Stick Image Path
  // Path to your RAM stick image file (cropped Kingston FURY BEAST image):
  ramImageUrl: "ram.png",

  // 4. Milestone Markers displayed under the RAM stick
  milestones: [
    { percent: 25, label: "25%" },
    { percent: 50, label: "50%" },
    { percent: 75, label: "75%" },
    { percent: 100, label: "100% (Kingston FURY)" }
  ],

  // 5. Contributor List
  // Add contributors as friends chip in.
  // Example entry:
  //   { name: "Alex M.", persona: "1997 Dinosaur Pajamas", status: "Backed" },
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
