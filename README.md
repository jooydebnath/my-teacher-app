# My Teacher app

My Teacher App

Software Requirements Specification (SRS)

Version 1.0

April 2026

 

 

"বই না বুঝলে, My Teacher খুলে দেখো"

 

 




1. Introduction

 

1.1 Purpose

This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the My Teacher App — a Bangla-medium educational platform targeting students from Class 6 to Class 12 following the NCTB curriculum. The document is intended for developers, designers, QA engineers, and project stakeholders.

 

1.2 Project Overview

My Teacher App is a mobile-first educational application that functions as a personal teacher, textbook, and coaching center rolled into one. The app delivers curriculum-aligned content in easy Bangla with structured learning, practice, and progress tracking capabilities.

 

1.3 Scope

Covers Classes 6–12 under the NCTB curriculum

Supports subjects: Bangla, English, Math, Science, ICT, BGS/Social Science, Physics, Chemistry

Provides teacher-style explanations, key points, CQs, MCQs, and Short Questions per topic

Includes optional video classes, practice mode, streak tracking, and a leaderboard

Supports a subscription model with a profile dashboard

 

1.4 Definitions, Acronyms & Abbreviations

Term

Definition

SRS

Software Requirements Specification

NCTB

National Curriculum and Textbook Board (Bangladesh)

CQ

Creative Question — structured open-ended exam question

MCQ

Multiple Choice Question

SQ

Short Question

UI

User Interface

UX

User Experience

API

Application Programming Interface

SSO

Single Sign-On

 

1.5 References

NCTB Curriculum Guidelines (Classes 6–12)

My Teacher App Product Brief (uploaded PDF)

Bangladesh Mobile Education Market Research, 2024

 




2. Overall Description

 

2.1 Product Perspective

My Teacher App is an independent mobile application. It interfaces with a backend content management system (CMS) for curriculum content, a user authentication service, a payment gateway for subscriptions, and an optional video streaming service for video classes.

 

2.2 User Classes & Characteristics

User Type

Description

Technical Proficiency

Student (Primary)

Class 6–12 students, ages 11–18, Bangladesh

Low to Medium

Guardian/Parent

Monitors child progress

Low

Content Admin

Manages curriculum content via CMS

Medium to High

Super Admin

Manages platform, users, subscriptions

High

 

2.3 Operating Environment

Primary Platform: Android (minimum API Level 21 / Android 5.0)

Secondary Platform: iOS (minimum iOS 13)

Optional Web Interface for Admin CMS

Internet connectivity required; partial offline mode for saved content

 

2.4 Design & Implementation Constraints

All student-facing content must be in easy Bangla (Class 6 reading level)

Each paragraph/explanation must be 100–150 words maximum

App must function on low-end Android devices (2GB RAM minimum)

Content must strictly follow NCTB curriculum and chapter structure

Payment integration must support bKash, Nagad, and debit/credit cards

 

2.5 Assumptions & Dependencies

Curriculum content will be pre-loaded and maintained by a content team via CMS

Video content will be hosted on an external streaming service (e.g., YouTube or Vimeo private)

Users have access to a smartphone with minimum 4G internet connectivity

Initial launch targets Classes 6–10; Classes 11–12 to follow in Phase 2

 




3. Functional Requirements

 

3.1 Onboarding & Class Selection

3.1.1 Splash / Loading Screen

Display app logo with tagline on launch

Show loading animation while initializing app data

 

3.1.2 Class Selection

Present class options: Class 6, 7, 8, 9-10, 11-12

Allow user to select their class with a single tap

Persist class selection across sessions

Allow class update from Profile Settings

 

3.2 Subject Selection

Display all available subjects for the selected class

Subjects for Classes 6–10: Bangla, English, Math, Science, ICT, BGS/Social Science

Additional subjects for Classes 11–12: Physics, Chemistry (Phase 2)

Each subject displayed with a distinct icon and color

Indicate completion percentage per subject

 

3.3 Chapter & Topic Navigation

3.3.1 Chapter List

List all chapters for the selected subject

Display a progress bar showing percentage of chapters completed

Chapters locked/unlocked based on subscription status

 

3.3.2 Topic / Paragraph List

List all topics within a selected chapter

Each topic shown as a tappable card

Mark topics as Completed, In Progress, or Not Started

 

3.4 Topic Learning Page (Core Feature)

This is the primary learning screen of the application. It must include the following components in order:

 

#

Component

Description

1

Topic Title

Displays the topic name prominently at the top

2

Teacher-style Explanation

Easy Bangla narrative explanation, 100–150 words, conversational tone

3

Key Points

Bullet list: Definition, Formula (if applicable), Process/Summary

4

CQ (Creative Question)

One or two open-ended creative questions for exam preparation

5

MCQ (10–15 questions)

Multiple choice questions with 4 options each; correct answer stored

6

SQ (Short Questions)

3–5 short answer questions

7

Video Class (Optional)

Embedded or linked video lesson; shown only if available

8

Practice Button

Launches Practice Mode for the topic

 

3.5 Practice Mode

Launch a dedicated MCQ practice session for a selected topic

Display one question at a time with 4 answer options

Provide immediate feedback (correct/incorrect) after each answer

Display score summary at end: Score (e.g., 8/10), Correct answers, Incorrect answers

Update user streak on completion

 

3.6 Profile & Progress Dashboard

Display user name, class, and avatar

Show learning streak (consecutive days of activity)

Show overall progress percentage

Show per-subject progress bars (e.g., Math 60%, Science 30%)

Include navigation to Leaderboard, Subscription, and Settings

 

3.7 Leaderboard

Display top users ranked by streak or overall completion

Show user rank, name, and score/streak

Filterable by Weekly and All-time views

 

3.8 Subscription Management

Offer Free Tier: Access to limited topics per chapter

Offer Premium Tier: Full access to all content, video classes, and practice mode

Support payment via bKash, Nagad, and card payments

Display subscription status and renewal date in Profile

Send push notification reminders before subscription expiry

 

3.9 Save & Bookmark

Allow users to bookmark any topic for quick access

Provide a Saved Topics section in the Profile Dashboard

 




4. Non-Functional Requirements

 

4.1 Performance

Topic Learning Page must load within 2 seconds on a 4G connection

MCQ practice sessions must respond to user input within 300ms

App must support at least 10,000 concurrent users without degradation

 

4.2 Usability

All student-facing UI text must be in Bangla

Font size must be minimum 16sp for body text on mobile

Navigation depth from Home to Topic Learning Page must not exceed 4 taps

UI must follow Material Design 3 guidelines

 

4.3 Reliability

System uptime must be at least 99.5% monthly

User progress data must be backed up to the cloud after every session

Offline mode: saved topics must be accessible without internet

 

4.4 Security

All user data must be transmitted over HTTPS (TLS 1.2 or higher)

Passwords must be hashed with bcrypt (minimum cost factor 12)

Payment data must comply with PCI-DSS standards

No student personal data shared with third parties

 

4.5 Scalability

Backend must support horizontal scaling via containerization (Docker/Kubernetes)

Content delivery must use a CDN for images and videos

 

4.6 Maintainability

Content must be manageable via an Admin CMS without code deployment

App codebase must follow modular architecture for independent feature updates

 




5. System Architecture Overview

 

5.1 High-Level Architecture

Layer

Component

Technology (Recommended)

Frontend

Mobile App

Flutter (Android + iOS)

Frontend

Admin CMS

React.js (Web)

Backend

API Server

Node.js + Express.js

Database

User & Progress Data

PostgreSQL

Database

Content Storage

MongoDB or PostgreSQL

Media

Video Hosting

YouTube (Private) / Bunny.net

Media

Images & Assets

AWS S3 + CloudFront CDN

Payments

Payment Gateway

SSLCommerz / bKash API

Auth

Authentication

Firebase Auth or JWT

Notifications

Push Notifications

Firebase Cloud Messaging (FCM)

 

6. User Flows

 

6.1 Primary Learning Flow

User opens app → Splash screen shown

User selects Class (one-time on first launch)

User selects Subject from subject grid

User selects Chapter from chapter list

User selects Topic from topic list

Topic Learning Page loads with explanation, key points, CQ, MCQ, SQ

User taps Practice → MCQ practice session begins

Score displayed → Streak updated → User returns to topic list

 

6.2 Subscription Flow

User taps locked content or Subscription from Profile

Subscription plan displayed (Free vs Premium)

User selects plan and payment method (bKash / Nagad / Card)

Payment processed → Confirmation shown → Premium access unlocked

 




7. Data Requirements

 

7.1 Content Data Model

Entity

Key Fields

Class

class_id, name (e.g., Class 6), level

Subject

subject_id, class_id, name, icon, color

Chapter

chapter_id, subject_id, title, order_index

Topic

topic_id, chapter_id, title, explanation, key_points (JSON)

CQ

cq_id, topic_id, question_text

MCQ

mcq_id, topic_id, question, option_a/b/c/d, correct_option

SQ

sq_id, topic_id, question_text

Video

video_id, topic_id, video_url, thumbnail_url

 

7.2 User Data Model

Entity

Key Fields

User

user_id, name, phone, class_id, subscription_status, created_at

Progress

progress_id, user_id, topic_id, status (completed/in-progress), score

Streak

streak_id, user_id, current_streak, longest_streak, last_active_date

Bookmark

bookmark_id, user_id, topic_id, saved_at

Subscription

sub_id, user_id, plan, start_date, end_date, payment_method

 

8. Content Rules & Guidelines

 

Each topic explanation must be written in easy, conversational Bangla

Maximum explanation length: 150 words per paragraph

Minimum MCQ count per topic: 10; maximum: 15

All MCQs must have exactly 4 options with one clearly correct answer

CQs must follow the standard Bangladesh board exam creative question format

Explanation tone: teacher speaking directly to student (e.g., 'ধরো তুমি...')

Key Points must include: Definition, Formula (where applicable), Process/Summary

 

9. Project Phases & Milestones

 

Phase

Deliverables

Target

Phase 1 – MVP

Onboarding, Class 6–10 content (Science + Math), Topic Learning Page, MCQ Practice

Month 1–3

Phase 2 – Full Launch

All subjects Classes 6–10, Video classes, Streak & Leaderboard, Subscription

Month 4–6

Phase 3 – Expansion

Classes 11–12 (Physics, Chemistry), Offline mode, Guardian dashboard

Month 7–9

Phase 4 – Growth

AI-powered personalized recommendations, Live doubt sessions

Month 10–12

 

10. Appendix

 

10.1 Screen List Summary

Screen #

Screen Name

Description

S1

Splash / Loading

Logo, tagline, loading animation

S2

Onboarding – Class Selection

Select Class 6–12

S3

Subject Selection

Grid of available subjects

S4

Chapter List

Chapters with progress bar

S5

Topic List

Clickable topic cards per chapter

S6

Topic Learning Page

Core content: explanation, key points, CQ, MCQ, SQ, video, practice

S7

Practice Mode

MCQ quiz with scoring

S8

Results Screen

Score display, streak update

S9

Profile Dashboard

Name, streak, progress, subjects

S10

Leaderboard

Rankings by streak/completion

S11

Subscription

Plan selection and payment

S12

Settings

Class change, language, notifications

 

 

 

End of Software Requirements Specification

My Teacher App — Version 1.0 | April 2026




app design please 

modern unic design please

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://my-teacher-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/81a37479-1452-48b3-bb98-52344b33e04d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
