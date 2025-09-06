# AI-Assisted React Portfolio Project

# Asset Tracker Mobile App

A React Native mobile application for tracking precious assets like gold, silver, diamond, and platinum ornaments.

This project was built with the help of AI code generation tools as part of my exploration into prompt engineering and AI-assisted development workflows. My role was to:

Provide structured prompts to guide the AI in producing React Native components.

Iteratively refine requirements and validate outputs.

Enhance the generated scaffolding with manual improvements for clean UI, better UX, and reliable state management.


This demonstrates my ability to leverage AI tools effectively while applying frontend expertise in reviewing, debugging, and refining code.

## Features

- **Asset Management**: Add, edit, and delete asset entries
- **Metal Types**: Support for Gold, Silver, Diamond, and Platinum
- **Ornament Types**: Bangle, Ring, Chain, Necklace, Earrings, Bracelet, Pendant, Anklet
- **Weight Tracking**: Optional weight input in grams
- **Count Tracking**: Track quantity of each ornament
- **Local Storage**: All data stored locally on device using AsyncStorage
- **Summary View**: Overview of total assets by metal type
- **Modern UI**: Clean, intuitive interface with material design elements

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development) or Xcode (for iOS development)

### Getting Started

1. **Install dependencies:**
   ```bash
   cd asset-tracker
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device/emulator:**
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - Or scan the QR code with Expo Go app

### Building APK

1. **Install EAS CLI:**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Configure EAS:**
   ```bash
   eas build:configure
   ```

3. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

## Usage

### Adding Assets
1. Tap the "+" button in the header
2. Select metal type (required)
3. Select ornament type (required)
4. Enter count (required)
5. Enter weight in grams (optional)
6. Tap "Save"

### Editing Assets
1. Tap the edit icon (pencil) on any asset item
2. Modify the details
3. Tap "Save"

### Deleting Assets
1. Tap the delete icon (trash) on any asset item
2. Confirm deletion in the alert dialog

### Viewing Summary
The summary section shows total count and weight for each metal type you have assets for.

## Data Storage

All asset data is stored locally on your device using AsyncStorage. The data persists between app sessions and includes:
- Asset ID (auto-generated)
- Metal type
- Ornament type
- Count
- Weight (optional)
- Creation timestamp
- Last updated timestamp

## Project Structure

```
asset-tracker/
├── App.js                 # Main application component
├── components/
│   ├── AssetForm.js       # Form for adding/editing assets
│   └── AssetItem.js       # Individual asset display component
├── utils/
│   └── storage.js         # AsyncStorage utilities
├── package.json           # Dependencies and scripts
├── app.json              # Expo configuration
└── babel.config.js       # Babel configuration
```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **AsyncStorage**: Local data persistence
- **React Native Picker Select**: Dropdown selection components
- **Expo Vector Icons**: Icon library

## Future Enhancements

- Export data to CSV/Excel
- Backup and restore functionality
- Photo attachments for assets
- Price tracking and valuation
- Categories and tags
- Search and filter functionality
- Charts and analytics
