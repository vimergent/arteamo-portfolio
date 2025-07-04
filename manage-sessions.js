#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SEQUENCE_FILE = path.join(__dirname, 'SESSION_SEQUENCE.json');

// Read current sequence
function readSequence() {
    try {
        return JSON.parse(fs.readFileSync(SEQUENCE_FILE, 'utf8'));
    } catch (error) {
        console.error('Error reading SESSION_SEQUENCE.json:', error);
        return null;
    }
}

// Write sequence back to file
function writeSequence(data) {
    fs.writeFileSync(SEQUENCE_FILE, JSON.stringify(data, null, 2));
}

// Start a new session
function startNewSession() {
    const sequence = readSequence();
    if (!sequence) return;
    
    const today = new Date().toISOString().split('T')[0];
    const sessionNumber = sequence.next_session_number;
    const filename = `SESSION_SUMMARY_${today}.md`;
    
    // Check if a session already exists for today
    const existingToday = sequence.sessions.find(s => s.filename === filename);
    if (existingToday) {
        console.log(`⚠️  Session already exists for ${today}`);
        console.log(`   Sequence #${existingToday.sequence}: ${existingToday.filename}`);
        return existingToday;
    }
    
    // Create new session entry
    const newSession = {
        sequence: sessionNumber,
        filename: filename,
        actual_date: today,
        status: "IN_PROGRESS",
        key_work: [],
        git_commits: [],
        uncommitted_changes: []
    };
    
    // Update sequence
    sequence.sessions.push(newSession);
    sequence.current_session = sessionNumber;
    sequence.next_session_number = sessionNumber + 1;
    sequence.last_updated = today;
    
    writeSequence(sequence);
    
    console.log(`✅ Started new session #${sessionNumber}`);
    console.log(`   Filename: ${filename}`);
    
    return newSession;
}

// Get current session
function getCurrentSession() {
    const sequence = readSequence();
    if (!sequence) return null;
    
    return sequence.sessions.find(s => s.sequence === sequence.current_session);
}

// List all sessions in order
function listSessions() {
    const sequence = readSequence();
    if (!sequence) return;
    
    console.log('\n📋 Session History (Chronological Order):\n');
    
    sequence.sessions.forEach(session => {
        console.log(`Session #${session.sequence}: ${session.filename}`);
        console.log(`  Date: ${session.actual_date}`);
        console.log(`  Status: ${session.status || 'COMPLETED'}`);
        if (session.note) {
            console.log(`  Note: ${session.note}`);
        }
        if (session.key_work.length > 0) {
            console.log(`  Key work:`);
            session.key_work.forEach(work => console.log(`    - ${work}`));
        }
        console.log('');
    });
    
    console.log(`Next session will be: #${sequence.next_session_number}\n`);
}

// Update current session
function updateCurrentSession(updates) {
    const sequence = readSequence();
    if (!sequence) return;
    
    const currentSession = sequence.sessions.find(s => s.sequence === sequence.current_session);
    if (!currentSession) {
        console.error('No current session found');
        return;
    }
    
    // Merge updates
    if (updates.key_work) {
        currentSession.key_work = [...new Set([...currentSession.key_work, ...updates.key_work])];
    }
    if (updates.git_commits) {
        currentSession.git_commits = [...new Set([...currentSession.git_commits, ...updates.git_commits])];
    }
    if (updates.uncommitted_changes) {
        currentSession.uncommitted_changes = updates.uncommitted_changes;
    }
    if (updates.status) {
        currentSession.status = updates.status;
    }
    
    sequence.last_updated = new Date().toISOString().split('T')[0];
    writeSequence(sequence);
    
    console.log(`✅ Updated session #${currentSession.sequence}`);
}

// Main CLI
const command = process.argv[2];

switch (command) {
    case 'start':
        startNewSession();
        break;
    case 'current':
        const current = getCurrentSession();
        if (current) {
            console.log(`Current session: #${current.sequence} (${current.filename})`);
            console.log(`Status: ${current.status || 'COMPLETED'}`);
        } else {
            console.log('No current session');
        }
        break;
    case 'list':
        listSessions();
        break;
    case 'update':
        // Example: node manage-sessions.js update --status COMPLETED
        // Would need to parse additional arguments
        console.log('Update functionality to be implemented');
        break;
    default:
        console.log('Session Management Tool');
        console.log('Usage:');
        console.log('  node manage-sessions.js start    - Start a new session');
        console.log('  node manage-sessions.js current  - Show current session');
        console.log('  node manage-sessions.js list     - List all sessions in order');
}