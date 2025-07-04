# Session Management Best Practices for Multi-Session Projects

## Overview
This guide provides a complete session management system for maintaining continuity across multiple Claude Code sessions, based on proven practices from the Studio Arteamo project.

## Why This System is Essential

1. **Context Window Limitations**: Claude has finite context, requiring information handoff between sessions
2. **Server Time Issues**: Protects against incorrect system dates affecting chronology
3. **Project Continuity**: Ensures new sessions can understand and continue previous work
4. **Change Tracking**: Documents all modifications with explanations
5. **Debugging Aid**: Historical record helps troubleshoot issues

## Core Components

### 1. CLAUDE.md Rules (MUST ADD TO YOUR PROJECT)

Add these rules to your project's CLAUDE.md file:

```markdown
## IMPORTANT: Permanent Rules

### 1. Documentation Rule - CRITICAL FOR CONTINUITY
**ALWAYS create a session summary file** at the end of each work session:
- Filename format: `SESSION_SUMMARY_YYYY-MM-DD.md`
- Document ALL changes made during the session
- Include file paths and line numbers for modifications
- Explain the purpose and impact of each change
- List any new files created
- Note any pending tasks or issues
- This ensures future instances can understand and continue the work even if context is lost

**ALWAYS check for existing session summaries** at the start of each session:
- Read the most recent SESSION_SUMMARY file first
- Review previous sessions to understand project history
- Use `ls -la SESSION_SUMMARY_*.md` to list all sessions
- Continue work based on documented state, not assumptions

**USE the session management system** to maintain chronological order:
- Check sequence: `cat SESSION_SEQUENCE.json`
- List sessions in order: `node manage-sessions.js list`
- View current session: `node manage-sessions.js current`
- Start new session: `node manage-sessions.js start`
- This ensures correct order even if server date/time is incorrect

### 2. Holistic Analysis Rule
**ALWAYS analyze changes in the context of the whole project**:
- Before making any change, search for all files that might be affected
- Check for dependencies and interconnected components
- Test changes across all variations/modules
- Consider implications for all features
- Verify that new features don't break existing functionality
- Run comprehensive tests after significant modifications

### 3. Version Control Rule
**ALWAYS use GitHub for version control**:
- Commit changes frequently with descriptive messages
- Use the format: `git commit -m "feat/fix/docs: description of change"`
- Create commits for each logical unit of work
- Before major changes, ensure current version is committed
- If something breaks, you can easily restore: `git checkout <commit-hash>`
- Push to GitHub regularly to maintain remote backup
- Document commit strategy in git messages
```

### 2. SESSION_SEQUENCE.json

Initialize this file in your project root:

```json
{
  "project": "[Your Project Name]",
  "created": "[YYYY-MM-DD]",
  "last_updated": "[YYYY-MM-DD]",
  "session_counter": 0,
  "sessions": [],
  "current_session": null,
  "next_session_number": 1
}
```

### 3. manage-sessions.js

Create this Node.js script in your project root:

```javascript
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
    default:
        console.log('Session Management Tool');
        console.log('Usage:');
        console.log('  node manage-sessions.js start    - Start a new session');
        console.log('  node manage-sessions.js current  - Show current session');
        console.log('  node manage-sessions.js list     - List all sessions in order');
}
```

### 4. SESSION_SUMMARY Template

Use this template for every session summary:

```markdown
# Session Summary - [Month Day, Year]

## Overview
[Brief description of the session's main focus and goals]

## Key Changes Made

### 1. [Feature/Fix Name]
- **What**: [Description of the change]
- **Why**: [Reason for the change]
- **How**: [Technical implementation details]
- **Files Modified**:
  - `/path/to/file1.js` (lines 45-67) - Added validation for user input
  - `/path/to/file2.css` (lines 123-145) - Updated responsive breakpoints

### 2. [Next Feature/Fix]
[Continue pattern...]

## Complete File List
```
Modified files:
- /full/path/to/file1.js
- /full/path/to/file2.css
- /full/path/to/file3.html

New files:
- /full/path/to/newfile.js
- /full/path/to/newstyle.css

Deleted files:
- /full/path/to/oldfile.js
```

## Test Results
- ✅ All unit tests passing
- ✅ Integration tests completed
- ⚠️  Performance test shows 10% slower load time
- ❌ E2E test failing on mobile view

## Git Activity
```bash
# Commits made this session:
abc123f - feat: Add user authentication system
def456g - fix: Resolve mobile navigation bug
ghi789h - docs: Update API documentation

# Uncommitted changes:
M  src/components/Header.js
M  src/styles/main.css
?? src/utils/newHelper.js
```

## Current Project Status
- **Overall Progress**: 75% complete
- **Current Sprint**: User Authentication
- **Blockers**: 
  - API rate limiting needs adjustment
  - Waiting for design approval on login screen
- **Working Well**: 
  - Performance optimizations showing good results
  - New component architecture very maintainable

## Next Session Should Address
1. **Immediate Priority**: Fix failing E2E test on mobile
2. **Continue Work On**: Complete password reset flow
3. **Don't Forget**: Update environment variables documentation
4. **Technical Debt**: Refactor legacy authentication code

## Important Context for Next Session
1. **Database Changes**: Added new `last_login` column to users table
2. **API Updates**: New endpoint `/api/v2/auth/refresh` requires different headers
3. **Breaking Change**: Removed support for IE11, update browser requirements
4. **Performance Note**: Bundle size increased by 15KB, consider code splitting

## Debugging Notes
- **Issue**: Login fails intermittently on Safari
- **Attempted Solutions**:
  - Checked CORS headers ✅
  - Verified token expiration ✅
  - Tested different Safari versions ❌ (still investigating)
- **Workaround**: Force page refresh after login
- **Root Cause**: Likely related to Safari's cookie handling

## Session Metrics
- **Duration**: 3 hours 45 minutes
- **Lines Changed**: +847 / -213
- **Files Touched**: 23
- **Features Completed**: 2
- **Bugs Fixed**: 5
- **Tests Added**: 12
```

## Best Practices for Using This System

### At Session Start (First 10 minutes)
1. **Check Recent Work**:
   ```bash
   # List all sessions
   node manage-sessions.js list
   
   # Read most recent summary
   cat SESSION_SUMMARY_[most-recent-date].md
   
   # Check current git status
   git status
   git log --oneline -10
   ```

2. **Start New Session**:
   ```bash
   node manage-sessions.js start
   ```

3. **Review Previous Session's "Next Steps"**

### During the Session
1. **Keep Notes As You Work**:
   - Document changes immediately after making them
   - Include file paths and line numbers
   - Explain WHY, not just WHAT

2. **Commit Frequently**:
   ```bash
   git add -p  # Review changes before staging
   git commit -m "type: clear description"
   ```

3. **Test After Major Changes**:
   - Run relevant test suites
   - Check for regressions
   - Document any failures

### At Session End (Last 15 minutes)
1. **Create Comprehensive Summary**:
   - Use the template above
   - Be specific about changes
   - Include all context for next session

2. **Update Git**:
   ```bash
   git status  # Document uncommitted changes
   git log --oneline  # Record commit hashes
   ```

3. **Set Up Next Session**:
   - Clear "Next Steps" section
   - Note any blockers
   - Document work in progress

## Advanced Tips

### 1. Handling Long-Running Tasks
If a task spans multiple sessions:
```markdown
## Multi-Session Task: [Task Name]
- **Started**: Session #3 (2024-01-15)
- **Sessions Worked**: #3, #5, #7
- **Current Status**: 60% complete
- **Remaining Work**: 
  - Implement error handling
  - Add unit tests
  - Update documentation
```

### 2. Debugging Across Sessions
Track issues that persist:
```markdown
## Ongoing Issue: [Issue Name]
- **First Noticed**: Session #2
- **Symptoms**: [Description]
- **Attempted Fixes**:
  - Session #2: Tried X (failed)
  - Session #4: Tried Y (partial success)
  - Session #5: Implemented workaround
- **Status**: Workaround in place, root cause unknown
```

### 3. Quick Reference Section
Add to your CLAUDE.md:
```markdown
## Quick Commands
```bash
# Session management
node manage-sessions.js list
node manage-sessions.js start
cat SESSION_SUMMARY_*.md | grep -i "bug"

# Find recent changes
git log --since="3 days ago" --oneline
git diff --name-only HEAD~5

# Search session history
grep -r "authentication" SESSION_SUMMARY_*.md
```
```

### 4. Emergency Recovery
If context is completely lost:
```bash
# 1. Find most recent work
ls -la SESSION_SUMMARY_*.md
git log --oneline -20

# 2. Reconstruct context
cat SESSION_SEQUENCE.json
cat SESSION_SUMMARY_[latest].md

# 3. Check for uncommitted work
git status
git diff

# 4. Review project structure
find . -type f -name "*.md" | grep -E "(README|CLAUDE|TODO)"
```

## Common Pitfalls to Avoid

1. **Don't Rely on Memory**: Document everything
2. **Don't Skip Summaries**: Even short sessions need documentation
3. **Don't Assume Context**: Future you won't remember
4. **Don't Delay Documentation**: Write as you work
5. **Don't Ignore Git**: Commit frequently with clear messages

## Conclusion

This session management system has proven invaluable for:
- Multi-day projects
- Complex debugging sessions
- Team handoffs
- Learning from past approaches
- Maintaining project momentum

By following these practices, you ensure that every Claude Code session can pick up exactly where the last one left off, maintaining full context and project continuity.