const fs = require('fs');
const path = require('path');

function updateDeploymentVersion() {
    const indexPath = path.join(__dirname, 'index.html');
    const now = new Date();
    
    // Read current version
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Extract current version
    const versionMatch = content.match(/content="(\d+\.\d+\.\d+)"/);
    let currentVersion = versionMatch ? versionMatch[1] : '1.0.0';
    
    // Increment patch version
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    const newVersion = `${major}.${minor}.${patch + 1}`;
    
    // Update version
    content = content.replace(
        /content="\d+\.\d+\.\d+"/,
        `content="${newVersion}"`
    );
    
    // Update date
    const date = now.toISOString().split('T')[0];
    content = content.replace(
        /name="deployment-date" content="[\d-]+"/,
        `name="deployment-date" content="${date}"`
    );
    
    // Update time
    const time = now.toISOString().split('T')[1].substring(0, 5) + ' UTC';
    if (content.includes('deployment-time')) {
        content = content.replace(
            /name="deployment-time" content="[^"]+"/,
            `name="deployment-time" content="${time}"`
        );
    }
    
    // Write back
    fs.writeFileSync(indexPath, content);
    
    console.log(`Updated deployment version to ${newVersion} at ${date} ${time}`);
}

// Run if called directly
if (require.main === module) {
    updateDeploymentVersion();
}

module.exports = updateDeploymentVersion;