# Angular Superhero Management App

This Angular application allows you to manage superheroes. You can filter, create, edit, and delete superheroes with ease.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ChabierAlaiza/superheroes
```

2. Navigate to the project directory:

```bash
cd superheroes
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.enviroment.ts` file based on the `.enviroment.example.ts` file.

### Running the App

To start the development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser to view the app.

### Running the Mock Server

To start the mock server, run:

```bash
npm run mock-server
```

The mock server will be available at `http://localhost:3000/`.

## Features

- **Filter and List View**: Filter superheroes by name with minimal event triggering. Edit or create new superheroes easily.
- **Create / Edit**: Use a form to create or edit superheroes with necessary fields. Names are displayed in uppercase.
- **Service**: Simulate API calls using observables. Mock server is provided.
- **Loader**: Display a loader when fetching data to indicate loading state.
- **Notifications**: Inform users about successful actions or errors with informative messages.

## Additional Notes

- **Angular Material**: Utilize Angular Material for visual components.
- **Tests**: Add tests for components and services.
- **Reactive Programming**: Utilize reactive programming techniques.
- **Modularization**: Modularize components for better organization.
