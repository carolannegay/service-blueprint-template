# Interactive Service Blueprint Experience Plan

## Purpose

Create a reusable interactive service blueprint tool for mapping customer actions, front-stage experiences, back-stage processes, technical systems, opportunities, and recommendations.

The project should be reusable across different clients and projects.

## Primary Experience

The application displays a wide service blueprint matrix.

The left side contains fixed row labels. The right side contains horizontally scrollable journey columns. Every row must remain aligned across all columns.

The blueprint should feel like a professional consulting or service-design workshop artifact rather than a generic dashboard.

## Layout

### Project Header

Display:

- Project title
- Subtitle
- Client or organization
- Date
- Owner
- View/Edit controls

### Journey Header

The blueprint contains journey phases and columns.

Each column represents a stage or action in the customer journey.

Columns may be grouped under larger journey phases such as:

- Moment That Matters
- First Human Contact
- Consideration
- Purchase
- Support
- Retention

The number of phases and columns must be configurable.

### Front Stage

#### User Actions

Describe what the user or customer does.

Each action may be:

- Neutral
- Gain point
- Pain point

#### Touchpoints

List the interfaces, channels, or interactions involved.

Examples:

- Search engine
- Social media
- Website
- Landing page
- Email
- Phone
- Resource center
- Website form

#### Opportunities

Describe improvements that could make the experience clearer, easier, or more valuable.

### Line of Visibility

Display a strong horizontal divider separating customer-facing activity from internal activity.

### Back Stage

#### Business Processes

Describe the business activities that support the customer experience.

#### Technical Processes

Describe the platforms, systems, automations, or technical workflows that support the business process.

#### Recommendations

List specific recommended improvements.

A column may contain multiple recommendations.

## Visual Direction

Use:

- White page background
- Dark navy row-label column
- Blue journey-stage headers
- Thin gray borders
- Compact, highly readable typography
- Pale yellow for important moments
- Pale green for gain points
- Pale red for pain points
- Muted gray for neutral actions
- Blue accent borders for opportunities and recommendations

The interface should be structured, dense, and easy to scan.

Avoid:

- Large hero sections
- Dashboard-style KPI cards
- Decorative gradients
- Unnecessary illustrations
- Excessive rounded containers
- Unaligned independent cards

## Interaction Requirements

The application must support:

- View mode
- Edit mode
- Adding columns
- Removing columns
- Editing project details
- Editing journey phases
- Editing actions
- Editing touchpoints
- Editing opportunities
- Editing business processes
- Editing technical processes
- Adding recommendations
- Removing recommendations
- Saving to localStorage
- Resetting to sample data
- Exporting blueprint data as JSON
- Importing blueprint data from JSON
- Printing the blueprint

## Responsive Requirements

On desktop:

- Keep the row-label column fixed.
- Allow the blueprint columns to scroll horizontally.

On smaller screens:

- Preserve the matrix layout.
- Keep horizontal scrolling available.
- Do not stack each blueprint cell vertically.
- Ensure all content wraps cleanly.
- Prevent text from overlapping.

## Data Principles

Blueprint content must be data-driven.

Reusable components should not contain project-specific content.

Project-specific content should live in:

```text
src/data/blueprintData.json
```

The data model should support different numbers of phases, columns, touchpoints, and recommendations.

## Success Criteria

The project is successful when:

- A new project can be created by duplicating the repository.
- The blueprint data can be replaced without changing the layout components.
- The matrix remains aligned with many columns.
- The left labels stay visible during horizontal scrolling.
- Users can edit and export blueprint content.
- The application builds successfully with `npm run build`.
