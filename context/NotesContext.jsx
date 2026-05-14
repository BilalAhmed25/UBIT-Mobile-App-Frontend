import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

const INITIAL_NOTES = [
    {
        id: '1',
        title: 'Data Structures & Algorithms',
        subject: 'Computer Science',
        author: 'Prof. Ahmed Khan',
        date: 'May 10, 2026',
        pages: 42,
        fileSize: '3.2 MB',
        fileType: 'PDF',
        category: 'CS',
        semester: 3,
        description:
            'Comprehensive notes covering arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and dynamic programming with detailed examples and complexity analysis.',
        downloads: 128,
        rating: 4.8,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'Arrays & Linked Lists',
            'Stacks & Queues',
            'Trees & Binary Search Trees',
            'Graph Algorithms',
            'Sorting & Searching',
            'Dynamic Programming',
            'Complexity Analysis',
        ],
    },
    {
        id: '2',
        title: 'Software Requirement Engineering',
        subject: 'Software Engineering',
        author: 'Dr. Sara Malik',
        date: 'May 8, 2026',
        pages: 35,
        fileSize: '2.8 MB',
        fileType: 'PDF',
        category: 'SE',
        semester: 4,
        description:
            'Covers requirements elicitation, modeling, specification, and validation techniques for software systems.',
        downloads: 96,
        rating: 4.6,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'Elicitation',
            'Modeling',
            'Specification',
            'Validation',
            'Agile Requirements',
        ],
    },
    {
        id: '3',
        title: 'Operating Systems Concepts',
        subject: 'Computer Science',
        author: 'Prof. Bilal Raza',
        date: 'May 5, 2026',
        pages: 58,
        fileSize: '4.5 MB',
        fileType: 'PDF',
        category: 'CS',
        semester: 4,
        description:
            'Detailed notes on process management, memory management, file systems, I/O systems, and security with real-world case studies.',
        downloads: 154,
        rating: 4.9,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'Process Management',
            'CPU Scheduling',
            'Memory Management',
            'File Systems',
            'I/O Systems',
            'Security & Protection',
        ],
    },
    {
        id: '4',
        title: 'Artificial Neural Networks',
        subject: 'Artificial Intelligence',
        author: 'Dr. Usman Ali',
        date: 'May 3, 2026',
        pages: 30,
        fileSize: '2.1 MB',
        fileType: 'PDF',
        category: 'AI',
        semester: 6,
        description:
            'Introduction to perceptrons, backpropagation, convolutional neural networks, and deep learning frameworks.',
        downloads: 72,
        rating: 4.4,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'Perceptrons',
            'Backpropagation',
            'CNNs',
            'Deep Learning',
            'Neural Networks',
        ],
    },
    {
        id: '5',
        title: 'Database Management Systems',
        subject: 'Computer Science',
        author: 'Prof. Fatima Noor',
        date: 'April 28, 2026',
        pages: 48,
        fileSize: '3.7 MB',
        fileType: 'PDF',
        category: 'SE',
        semester: 3,
        description:
            'ER diagrams, normalization, SQL queries, transaction processing, concurrency control, and NoSQL databases.',
        downloads: 110,
        rating: 4.7,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'ER Diagrams',
            'Normalization',
            'SQL Queries',
            'Transaction Processing',
            'Concurrency Control',
            'NoSQL Databases',
        ],
    },
    {
        id: '6',
        title: 'Machine Learning Basics',
        subject: 'Artificial Intelligence',
        author: 'Ms. Ayesha Tariq',
        date: 'April 25, 2026',
        pages: 22,
        fileSize: '1.5 MB',
        fileType: 'PDF',
        category: 'AI',
        semester: 5,
        description:
            'Supervised vs unsupervised learning, regression, classification, clustering, and model evaluation metrics.',
        downloads: 64,
        rating: 4.3,
        uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        topics: [
            'Supervised Learning',
            'Unsupervised Learning',
            'Regression',
            'Classification',
            'Clustering',
        ],
    },
];

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(INITIAL_NOTES);
    const [bookmarks, setBookmarks] = useState([]);

    const addNote = (note) => {
        setNotes((prev) => [{ ...note, id: Math.random().toString() }, ...prev]);
    };

    const deleteNote = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const updateNoteRating = (id, newRating) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, rating: newRating } : note
            )
        );
    };

    const toggleBookmark = (noteId) => {
        setBookmarks((prev) =>
            prev.includes(noteId)
                ? prev.filter((id) => id !== noteId)
                : [...prev, noteId]
        );
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                bookmarks,
                addNote,
                deleteNote,
                updateNoteRating,
                toggleBookmark,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
