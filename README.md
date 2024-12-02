# I-X Team | Fetch.ai x Moderna Hackathon

## Team:
- Abdulaziz Alsaad
- Santosh Kumar Saravanan
- Asish Sayana
- Lyson Ober
- Sherwin Vadakkumcherry

This reposatiry includes the submission of Fetch.Ai hackathon in collaboration with Moderna. 

## Challenge: 
Produce a dashboard that uses Fetch.ai agents to support medical affairs with managing vaccination hesitancy.

## Flow Diagram
Flow of agents supporting the dashboard
![Copy of FetchAI-Hackathon](https://github.com/user-attachments/assets/95db1518-0e7d-433e-9442-0a07ecebaf52)

## Dashboard Walkthrough:
https://youtu.be/o6mBIjPEADA

## Dashboard overiew:
# Moderna Vaccination AI
## Project Overview
Developed by Imperial I-X Team, this hackathon project introduces an innovative solution to address vaccination hesitancy through AI-powered analytics and visualization tools. The project integrates real-time data analysis with practical medical information to support healthcare providers in their vaccination efforts.
 
## Key Components
 
### 1. Vaccination Dashboard
The interactive dashboard serves as a comprehensive visualization platform for vaccination data:
* Regional mapping system with dynamic data display across England
* Customizable filtering system for analyzing:
  - Virus impact percentages
  - Vaccination hesitancy levels (Moderate, High, Severe)
  - Demographic breakdowns by age and gender
* Real-time data updates with smooth transitions between different views
* Interactive elements allowing for detailed data exploration
 
### 2. Social Media Analysis
This component monitors and analyzes vaccination-related discussions across social platforms:
* Automated tracking of high-impact posts and key opinion leaders
* Sentiment analysis categorizing content as positive or negative
* Multiple visualization timeframes:
  - Daily bi-directional bar charts
  - Weekly trend analysis
  - Monthly pattern recognition
* Impact scoring system measuring post reach and influence
* Automated data collection and storage through Supabase integration
 
### 3. Vaccination Hesitancy Mapping
An advanced AI-driven system for analyzing and improving patient-doctor interactions:
* Conversation analysis capabilities:
  - Real-time sentiment tracking
  - Key moment identification
  - Hesitancy trigger detection
* Strategic intervention tools:
  - Customized checklists for healthcare providers
  - Communication flow frameworks
  - Simulated dialogue scenarios
* Historical tracking and analysis storage
 
## Technical Infrastructure
* Database: Supabase implementation for real-time data management
* AI Agents: Automated data collection and analysis
* Visualization: Interactive charts and maps
* Integration: Seamless connection between all components
 
## Impact and Applications
The system provides healthcare professionals with:
* Data-driven insights into community vaccination trends
* Tools for identifying and addressing hesitancy factors
* Personalized strategies for patient communication
* Historical data for tracking intervention effectiveness
 




## Fetch.ai Agents: 

- Vaccine Information Agent: This agent queries vaccine knowledge project website and retrieves vaccine specific information.
- Twitter Agent: This agent searches for tweets containing a specified keywords and returns the top 10 results which is used for dashboard sentiment analysis.
- User Agent: This agent acts as an orchestrator for the Moderna vaccination dashboard. The agent communicates with another agents at a specified address to retrieve required information.
- Vaccine hesistancy  agent: This agent queries vaccine hesitancy based on age from the office of national statistics data persisted in supabase DB.
- Vaccine hesistancy education agent: This agent queries vaccine hesitancy based on education from the office of national statistics data persisted in supabase DB.
- Vaccine hesistancy employment agent: This agent queries vaccine hesitancy based on employment from the office of national statistics data persisted in supabase DB.
- Vaccine hesistancy health statuts agent: This agent queries vaccine hesitancy based on health status from the office of national statistics data persisted in supabase DB.
- Vaccine hesistancy number of people agent: This agent queries vaccine hesitancy based on number of people in household from the office of national statistics data persisted in supabase DB.
- Vaccine hesistancy sex agent: This agent queries vaccine hesitancy based on gender from the office of national statistics data persisted in supabase DB.
- Health news report agent: This agent queries current health news report based on synthetic data generated with random news points.
