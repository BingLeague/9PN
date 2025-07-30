# 9PN - Name Decoding System

A deep name analysis system based on the Five Elements theory, providing personalized fortune-telling through the analysis of name stroke counts and their correlation with elemental attributes.

## Project Overview

9PN is a professional name decoding system with the following main features:

- **Name Five Elements Analysis**: Calculate Five Elements attributes through stroke counts, analyzing the correlation between names and destiny charts
- **Thought Function Analysis**: Deep analysis of thought function's three stages and five periods, revealing personal traits and development directions
- **Magnetic Field System**: Analysis of positive reactions, negative reactions, and neutral palace (no celestial pattern) impacts on life
- **Yin-Yang Compatibility**: Analysis of personal compatibility patterns with superiors and environment, providing career development advice

## Tech Stack

- **Frontend Framework**: uni-app (Vue.js)
- **Deployment Platforms**: HBuilder + ICP Blockchain
- **Styling**: SCSS + Responsive Design

## Installation & Setup

### Prerequisites

- Node.js 14.0+
- HBuilder X

### Main Installation (HBuilder)

1. **Download and install HBuilder X**
   - Download from: https://www.dcloud.io/hbuilderx.html
   - Install and launch HBuilder X

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 9PN
   ```

3. **Open project in HBuilder X**
   - Open HBuilder X
   - Click "File" → "Open Directory"
   - Select the 9PN project folder

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run development server**
   - In HBuilder X, click "Run" → "Run to Browser" → "Chrome"
   - Or use command line: `npm run dev:h5`

### Alternative Deployment (ICP Blockchain)

For ICP blockchain deployment, additional setup is required:

1. **Install dfx**
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Configure identity**
   ```bash
   dfx identity new my-identity
   dfx identity use my-identity
   ```

3. **Deploy to ICP mainnet**
   ```bash
   chmod +x deploy_icp.sh
   ./deploy_icp.sh
   ```

## Project Structure

```
9PN/
├── pages/                 # Page files
│   ├── index/            # Home page
│   ├── decrypt/          # Decoding pages
│   ├── friends/          # Friends page
│   ├── history/          # History records
│   └── test/             # Test pages
├── static/               # Static resources
│   ├── images/           # Image resources
│   ├── data/             # Data files
│   └── js/               # JavaScript utilities
├── uni_modules/          # uni-app modules
├── assets/               # ICP deployment static files
├── dfx.json             # ICP deployment config
├── deploy_icp.sh        # ICP deployment script
└── README.md            # Project documentation
```

## Core Features

### Name Five Elements Analysis
- Calculate stroke counts for each character in the name
- Determine Five Elements attributes based on stroke counts
- Analyze Five Elements relationships (generation and restriction)

### Thought Function Analysis
- Three stages and five periods classification
- Personal trait analysis
- Development recommendations

### Magnetic Field System
- Positive reaction analysis
- Negative reaction analysis
- Neutral palace (no celestial pattern) analysis

### Yin-Yang Compatibility
- Personal compatibility patterns with superiors
- Career development advice
- Relationship management strategies

## Development Guide

### Adding New Pages

1. Create new `.vue` file in `pages/` directory
2. Configure routing in `pages.json`
3. Update navigation menu

### Modifying Styles

- Global styles: `uni.scss`
- Page styles: `<style>` section in each page
- Responsive design: Use media queries

### Updating Data

- Stroke data: `static/data/kxz_stroke_dict.json`
- Analysis content: `data()` section in each page

## Deployment Guide

### HBuilder Deployment
- Supports H5, WeChat Mini Program, App multi-platform deployment
- Visual operation through HBuilder X

### ICP Blockchain Deployment
- Static file deployment to ICP mainnet
- Automated deployment through `deploy_icp.sh` script
- Access URL: `https://<canister-id>.ic0.app`

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

## License

ISC License

## Contact

For questions or suggestions, please contact us through:
- Project Issues
- Email: [your-email@example.com]

---

**Note**: This project is for learning and research purposes only. Fortune-telling results are for reference only.
