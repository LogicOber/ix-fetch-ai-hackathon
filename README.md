# NHS Monitor - Fetch AI Hackathon Project

A modern, AI-powered health monitoring dashboard that leverages Fetch.ai's technology to provide real-time insights into NHS (National Health Service) performance metrics, patient care analytics, and resource allocation optimization.

## 🚀 Features

- **Real-time Health Board Dashboard**
  - Interactive visualization of key NHS performance metrics
  - Geospatial analysis of healthcare facilities and resources
  - Dynamic filtering and data exploration capabilities

- **Social Media Analysis**
  - AI-powered sentiment analysis of healthcare-related social media content
  - Trend identification and public health concern monitoring
  - Real-time social media engagement metrics

- **AI-Powered Chat Assistant**
  - Integrated chatbot for instant query resolution
  - Natural language processing for complex healthcare queries
  - Personalized insights and recommendations

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **UI Components**: 
  - Radix UI for accessible component primitives
  - Tailwind CSS for styling
  - Recharts for data visualization
  - React Leaflet for geospatial mapping
- **State Management**: React Hooks and Context API
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **AI Integration**: Fetch.ai technology stack

## 🏗️ Project Structure

```
fetch-ai-hackathon-project/
├── src/
│   ├── pages/
│   │   ├── health-board/       # Main dashboard components
│   │   └── social-media-analysis/ # Social media analytics
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── chat/              # Chat interface components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions and helpers
```

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fetch-ai-hackathon-project.git
   cd fetch-ai-hackathon-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

The project uses various configuration files:
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI components configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Fetch.ai team for providing the AI infrastructure
- NHS Digital for healthcare data insights
- Open source community for various tools and libraries used in this project
