# Deployment Capabilities and Automated Workflow

## IMPORTANT: Claude Code has full deployment and testing capabilities

### 1. GitHub Deployment
- **Full git access**: Can commit and push to GitHub
- **Auto-deploy trigger**: GitHub pushes automatically trigger Netlify deployment
- **Commands available**:
  ```bash
  git add .
  git commit -m "commit message"
  git push origin master
  ```

### 2. Netlify CLI Access
- **Authentication**: Already authenticated with Netlify CLI token
- **Can monitor deployments**: Check deployment status and logs
- **Commands available**:
  ```bash
  netlify status
  netlify deploy --prod
  netlify open
  netlify logs:function
  ```

### 3. Testing Capabilities
- **Headless Chrome**: Available for automated testing
- **Puppeteer**: Full access for comprehensive testing
- **Test files available**:
  - test-comprehensive.js
  - test-accessibility.js
  - test-performance.js
  - test-404-errors.js
  - test-images-comprehensive.js

### 4. Automated Deployment Workflow
When deploying, Claude Code should:
1. Run comprehensive tests locally first
2. Commit changes to GitHub with descriptive message
3. Push to trigger auto-deploy
4. Monitor Netlify deployment logs
5. Run Puppeteer tests on live site
6. Fix any issues found and repeat

## Key Commands for Future Instances

```bash
# Full deployment sequence
cd /root/Interiori/websites
node test-comprehensive.js
git add .
git commit -m "fix: description of changes"
git push origin master
netlify status
netlify logs:deploy
node test-production-ready.js
```

## Remember
- Don't wait for user permission to deploy
- Always test before and after deployment
- Fix issues proactively
- Document all changes in session summaries