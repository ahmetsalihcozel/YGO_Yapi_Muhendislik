
const fs = require('fs');
const path = require('path');

const projectsFile = 'public/data/projects.json';
const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));

// Desired positions (1-based index from user -> 0-based array index)
// User Request:
// 11 --> 1 (Index 0)
// ??? --> 2 (Index 1) - Default to existing project at index 1 (ID 2 usually)
// 17 --> 3 (Index 2)
// 18 --> 4 (Index 3)
// 19 --> 5 (Index 4)
// 22 --> 6 (Index 5)

// Helper to find project by ID
const findById = (id) => projects.find(p => p.id === id);

// The priority list: [Project Object or null if undefined]
// We'll fill the first 6 slots.
const newOrder = [];

// Slot 1 (Index 0): ID 11
const p11 = findById(11);
// Slot 2 (Index 1): ID 2 (Assuming we keep ID 2 'Reysaş' here as it wasn't moved, or just the next available 'top' one. Let's explicitly keep ID 2 if possible, or ID 1?
// User didn't specify slot 2. 
// Project 2 is "Reysaş Lojistik". Project 1 is "Dilovası".
// Let's assume slot 2 is the original slot 2 (ID 2).
const p2 = findById(2); 

// Slot 3 (Index 2): ID 17
const p17 = findById(17);
// Slot 4 (Index 3): ID 18
const p18 = findById(18);
// Slot 5 (Index 4): ID 19
const p19 = findById(19);
// Slot 6 (Index 5): ID 22
const p22 = findById(22);

// Construct the head of the list
newOrder[0] = p11;
newOrder[1] = p2;
newOrder[2] = p17;
newOrder[3] = p18;
newOrder[4] = p19;
newOrder[5] = p22;

// Create a set of IDs already placed to avoid duplicates
const placedIds = new Set(newOrder.filter(p => p).map(p => p.id));

// Append the rest of the projects that haven't been placed yet
projects.forEach(p => {
    if (!placedIds.has(p.id)) {
        newOrder.push(p);
    }
});

// Remove any nulls if finding failed (shouldn't happen with correct IDs)
const finalOrder = newOrder.filter(p => p !== null && p !== undefined);

fs.writeFileSync(projectsFile, JSON.stringify(finalOrder, null, 2), 'utf8');
console.log('Projects reordered successfully.');
