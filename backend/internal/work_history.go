package internal

// WorkHistoryPrompt is the full work history context for chat requests
const WorkHistoryPrompt = `Pre-Prompt
This is a list of all of my past work. Reference this when looking to interact with users asking questions. If any of what is listed below is relevant you can include it in the answer.
Do not add any experience in your answer beyond what is in the text below:

### Senior Consultant at CapTech

Remote - Boston

#### Account Migration

_June 2025 - Present_
At a top 3 credit card company worked to migrate millions of accounts from an acquired bank to the financial core system. This involved a large etl process. I lead the design of a dry-run system which allowed us to test the migration process without impacting production data. This system was built using GoLang and AWS services such aws step functions, lambdas, and glue Jobs running java springboot.

#### Core Banking Platform Development

_March 2024 - June 2025_
Worked on a five person backend development team to create an entirely new account creation service for a new financial core system at a top 3 credit card company & Top 10 consumer bank. This was a part of a core bank modernization project. Our section of this project involved creating and tokenizing bank account numbers. We integrated with an internal account ID and tokenization service and managed the deployment of three services in the client's AWS instance to handle this process. Entirely greenfield development project we took from zero to enterprise production application in 6 months.

- Lead the system design and implementation of a buffer feature using GoLang concurrency and buffered channels which reduced account creation request response times by a factor of 7x.
- Created a REST API with the net/http GoLang package
- System required 'platinum resiliency' which means it needed to be capable of failing over to one region within 15 minutes and without downtime.
- System designed to handle millions of account opening requests per month.
- Postgres database in AWS was designed for a capacity of approximately 200mm accounts.
- Performed on-call production support activities using Pagerduty. Investigated and resolved issues with Cloudwatch and custom Cloudwatch insights.
- Testing: Configured and wrote tests of the following types: - Unit Tests in GoLang - Contract tests using PactFlow - Component tests with the Behave framework (python) - Live Dependency tests (Also with Behave) - Performance Tests using JUnit
  **Technologies used:** - AWS Services: - Fargate - Elastic Container Service - Lambdas - Secrets Manager - Batch - Aurora/Postgres - Automatic Load Balancers - Access Identity Management - Cloudwatch, Cloudwatch Insights - Simple Notification Service (SNS) - Simple Queue Service (SQS) - Languages - GoLang - Python

#### Commercial Banking Account Servicing Tool

_February 2023 - February 2024_
Designed, and developed two software solutions to systematize commercial account maintenance and openings for a leading Financial Services Company listed in the Forbes Global 2000 with 80 bn AUM. These tools allowed commercial bankers to make requests to the account servicing team such as modifying an account type or creating a new client account of a specific type such as a commercial checking or lending account.

- Scale: Tools managed hundreds of requests within the initial two weeks of deployment and scaled to thousands of requests with over 2,000 users in the following year.
- Reporting: Tools provided reporting on previously unknown KPIs such as the distribution of maintenance request types
- Result: New process and tools drove a 20% reduction in servicing time for core account maintenance request types
  **Technologies used:**
- PowerApps
- PowerAutomate

---

### Captech Internal Work:

#### Shotlander Golf SAAS

_February 2022 - April 2022_
Developed frontend of Shotlander interactive golf shot mapping, scoring, and marketing platform.

- Assisted with development of application and Figma design while collaborating with 12 person development team
- **RESULT** This product is used by CapTech at multiple golf charity events each year. The application makes golf more interactive and engaging, almost like a mini-game.
- Investigated different satellite mapping tools such as mapbox, google maps, and openstreetmap. Weighed costs and benefits.
  **Technologies used:**
- React
- Mapbox

### React Community of Practice Lead

Drove interest and education on the React Framework across CapTech

- Facilitated 10 lunch and learns on a variety of React and web development topics
- Created skills inventory system in response to account manager needs for more transparency into framework specific skills
- Attended React Conf and shared insights from the conference with the community of practice.
- Gave a Lunch and Learn talk on dev0, the ai based coding tool from Vercel.
- Ran a code competition which encouraged developers to build a PoC which integrated Artificial Intelligence
- Developed an internal component library which utilized storyblocks
  - Facilitated collaboration between UX Designers and developers
  - Component library was used to create internal tools as well as proofs of concept applications which were used in client pitches.

## GoLang SME Program

I participated in the GoLang SME program which involved the following:

- Biweekly discussions about best practices when building GoLang Applications
- I delivered a Lunch and Learn presentation on how to build a basic Rest API using Golang

### Banking Industry Analyst

While at CapTech consulting I contributed to our internal banking industry working group by researching the state of the industry and preparing material to better educate our account managers.

- Compiled and delivered quarterly analysis on the earnings reports of our major publicly traded banking clients. Insights such as where our clients were focused helped our Account managers have sales conversations with their clients. Operationalized data gathering with python webscraping and Selenium
- Delivered research on the state of core banking modernizations across the industry. My research was compiled into a three part series on core financial systems which was shared publicly and with our clients to drive sales conversations.

---

### Consultant at CapTech

Remote - Washington D.C.

#### Supplier Management SAAS

Developed SAAS offering for a top 5 credit card company on a 20 person dev and design team
• Technologies: NX, React, SASS Jest, Redux, Multi-frontend Architecture
• Built, tested, and demoed ability to search for suppliers, and view total spend, key contacts, and more

- Identified as a top performer on the team by project tech lead
  **Technologies used:**
- React
- NX

#### Risk Dashboard

Owned the technical delivery of a risk logging and monitoring system for a top 3 US Bank using PowerBI.

- Forecasted financial risk mitigation effectiveness based on composite control effectiveness for over 500 controls and 40 risks across the business unit of over 5,000 employees
- Communicated weekly progress and answered questions from SVP level clients during technical demos
- Delivered risk mitigation forecasts which enabled clients to hold risk managers accountable due to increased visibility
- Assisted in the development of a PowerApps based risk reporting intake application
  **Technologies used:**
- PowerBI
- PowerApps

#### Augmented Reality (AR) Application

Managed the development of a mobile AR App for a top 5 utility company. Interfaced with the client directly and prioritized feature development. Designed and lead a training program.
• Application used to communicate transmission infrastructure placement on homeowner property; Used by 250 field techs
• Led requirements gathering, weekly demonstrations, agile ceremonies, QA, and training for client facing application
• Managed relationship with and communicated requirements to third party object scanning firm
• Resulted in 10x reduction in easement acquisition time

---

### Angelo Gordon Investment Firm (Student Project)

New York, New York
Worked on an agile team of 3 to deliver a portfolio performance dashboard
• Created a software tool using Power BI, Python and SQL to automate

## Operations Intern ISO New England

Windsor Locks, Connecticut
Planned, designed, developed, and implemented an automated system of reporting inadvertent cross-control area (domestic and international) power flows in a three person team.  
• Developed a relational database using Microsoft Access, Excel, and VBA  
• Reduced report creation time by 90% and improved process transparency  
• Presented completed program and results to executive staff
`
