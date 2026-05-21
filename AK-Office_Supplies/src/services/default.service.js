const data = [
    {
        "id": 1,
        "name": "Ballpoint Pens - Pack of 10",
        "category": "Writing Supplies",
        "description": "Black ink ballpoint pens for everyday use.",
        "image": "ballpoint_pens.jpg",
        "price": 5
    },
    {
        "id": 2,
        "name": "Mechanical Pencils - Pack of 12",
        "category": "Writing Supplies",
        "description": "0.7mm mechanical pencils with refillable lead.",
        "image": "mechanical_pencils.jpg",
        "price": 8
    },
    {
        "id": 3,
        "name": "Highlighters - Pack of 6",
        "category": "Writing Supplies",
        "description": "Assorted color highlighters for notes and documents.",
        "image": "highlighters.jpg",
        "price": 6
    },
    {
        "id": 4,
        "name": "Printer Paper - 500 Sheets",
        "category": "Paper Products",
        "description": "Standard 8.5 x 11 inch white printer paper.",
        "image": "printer_paper.jpg",
        "price": 9
    },
    {
        "id": 5,
        "name": "Sticky Notes - Pack of 12",
        "category": "Paper Products",
        "description": "Self-adhesive notes for reminders and organization.",
        "image": "sticky_notes.jpg",
        "price": 7
    },
    {
        "id": 6,
        "name": "Legal Pads - Pack of 3",
        "category": "Paper Products",
        "description": "Yellow lined legal pads for note taking.",
        "image": "legal_pads.jpg",
        "price": 6
    },
    {
        "id": 7,
        "name": "Paper Clips - Box of 100",
        "category": "Desk Accessories",
        "description": "Standard silver paper clips for organizing papers.",
        "image": "paper_clips.jpg",
        "price": 3
    },
    {
        "id": 8,
        "name": "Binder Clips - Pack of 24",
        "category": "Desk Accessories",
        "description": "Medium-sized black binder clips.",
        "image": "binder_clips.jpg",
        "price": 4
    },
    {
        "id": 9,
        "name": "Stapler",
        "category": "Desk Accessories",
        "description": "Standard desktop stapler with durable metal construction.",
        "image": "stapler.jpg",
        "price": 12
    },
    {
        "id": 10,
        "name": "Staples - Box of 5000",
        "category": "Desk Accessories",
        "description": "Standard staples compatible with most staplers.",
        "image": "staples.jpg",
        "price": 4
    },
    {
        "id": 11,
        "name": "Clipboard",
        "category": "Desk Accessories",
        "description": "Hardboard clipboard with metal clip.",
        "image": "clipboard.jpg",
        "price": 8
    },
    {
        "id": 12,
        "name": "Scissors",
        "category": "Desk Accessories",
        "description": "8-inch stainless steel office scissors.",
        "image": "scissors.jpg",
        "price": 7
    },
    {
        "id": 13,
        "name": "Desk Organizer",
        "category": "Desk Accessories",
        "description": "Multi-compartment organizer for office supplies.",
        "image": "desk_organizer.jpg",
        "price": 15
    },
    {
        "id": 14,
        "name": "File Folders - Pack of 20",
        "category": "Organization",
        "description": "Manila folders for filing documents.",
        "image": "file_folders.jpg",
        "price": 10
    },
    {
        "id": 15,
        "name": "3-Ring Binder - 2 Inch",
        "category": "Organization",
        "description": "Durable binder for storing documents.",
        "image": "three_ring_binder.jpg",
        "price": 11
    },
    {
        "id": 16,
        "name": "Hanging File Folders - Pack of 10",
        "category": "Organization",
        "description": "Colored hanging folders for file cabinets.",
        "image": "hanging_folders.jpg",
        "price": 13
    },
    {
        "id": 17,
        "name": "Whiteboard Markers - Pack of 8",
        "category": "Writing Supplies",
        "description": "Dry erase markers with assorted colors.",
        "image": "whiteboard_markers.jpg",
        "price": 9
    },
    {
        "id": 18,
        "name": "Correction Tape - Pack of 3",
        "category": "Writing Supplies",
        "description": "Easy-to-use correction tape for mistakes.",
        "image": "correction_tape.jpg",
        "price": 5
    },
    {
        "id": 19,
        "name": "Tape Dispenser",
        "category": "Desk Accessories",
        "description": "Weighted tape dispenser with refillable roll.",
        "image": "tape_dispenser.jpg",
        "price": 9
    },
    {
        "id": 20,
        "name": "Shipping Labels - Pack of 100",
        "category": "Paper Products",
        "description": "Printable adhesive labels for mailing and organization.",
        "image": "shipping_labels.jpg",
        "price": 14
    }
];


// featured products
//ids of products to feature on the landing page: pens, printer paper, sticky notes
const FEATURED_IDS = [1, 4, 5];

export const allProducts = () => data;

export const findProductById = id => data.find(p => p.id === id);

export const featuredProducts = () => data.filter(p => FEATURED_IDS.includes(p.id));

export const addProduct = product => {

    data.push(product);
};