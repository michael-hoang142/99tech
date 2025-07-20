# 99tech

<!-- TABLE OF CONTENTS -->
<details open>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About the Project</a>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
            </ul>
        </li>
        <li>
            <a href="#folder-structure--usage">Folder Structure & Usage</a>
        </li>
    </ol>
</details>

## About the Project

This repository demonstrates basic Playwright techniques using [demoqa.com](https://demoqa.com/) for API testing & https://opensource-demo.orangehrmlive.com/ for UI.

**Key Features:**
- Page Object Model (POM)
- Test Driven Development (TDD)
- Data-driven testing
- Shared logged-in state via fixtures
- Shared token management via fixtures
- CI available & manage by tag & config file
- Scaling ready through matrix shards, able to apply thread as well but I prefer to keep shard only

**Not supported:**
- .env file due to no integration with 3rd service
- No masked/hidden on credentials cause I want it develop fastest :p 

## Getting Started

### Prerequisites

Ensure the following software is installed:

- **Node.js:** [Download](https://nodejs.org/en/download/)
- **Visual Studio Code:** [Download](https://code.visualstudio.com/download)

### Installation

1. **Clone the repository:**
     ```sh
     git clone https://github.com/michael-hoang142/pw-assestment.git
     ```

2. **Navigate to the project folder and install dependencies:**
     ```sh
     cd pw-assestment
     npm install
     ```

3. **Install Playwright:**
     ```sh
     npx playwright install
     ```

## Folder Structure & Usage

- `config/` — Environment and platform configuration files
- `fixture/` — UI & API fixtures for shared states
- `page/` — Page Object Models and page actions
- `tests/` — Automated test cases
- `enums/` — Enum values for tags, environments, tenants

**Running Tests:**

- UI tests:
    ```sh
    npm run test-ui
    ```
- API tests:
    ```sh
    npm run test-api
    ```

---

For further guidance or queries, feel free to reach out or book an interview!
