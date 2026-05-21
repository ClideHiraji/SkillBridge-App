import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function SetupNeeded() {
  const handleCopyEnv = () => {
    const envContent = `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...`;
    navigator.clipboard.writeText(envContent);
    alert('Copied to clipboard! Paste into .env.local file');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🎉 SkillBridge
            </h1>
            <p className="text-gray-600 text-lg">
              Your fully functional prototype is ready!
            </p>
          </div>

          <div className="space-y-6">
            {/* Setup Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">⚙️ Quick Setup (5 minutes)</h2>
              
              <div className="space-y-4">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <h3 className="font-semibold text-blue-900">Create Supabase Project</h3>
                  </div>
                  <ol className="ml-11 space-y-1 text-sm text-blue-800">
                    <li>Go to <strong>https://supabase.com</strong></li>
                    <li>Click "Create Project"</li>
                    <li>Choose a project name and region</li>
                    <li>Wait 2-3 minutes for setup</li>
                  </ol>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <h3 className="font-semibold text-blue-900">Get API Keys</h3>
                  </div>
                  <ol className="ml-11 space-y-1 text-sm text-blue-800">
                    <li>Go to Settings → API</li>
                    <li>Copy <strong>Project URL</strong></li>
                    <li>Copy <strong>Anon Public Key</strong></li>
                  </ol>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <h3 className="font-semibold text-blue-900">Create <code className="bg-white px-2 py-1 rounded text-xs">.env.local</code></h3>
                  </div>
                  <div className="ml-11 space-y-2">
                    <p className="text-sm text-blue-800">In your project root, create file <code className="bg-white px-2 py-1 rounded text-xs">.env.local</code>:</p>
                    <div className="bg-white border border-gray-300 rounded p-3 font-mono text-xs space-y-1">
                      <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
                      <div>VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1Q...</div>
                    </div>
                    <Button 
                      onClick={handleCopyEnv}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1"
                    >
                      Copy Template
                    </Button>
                  </div>
                </div>

                {/* Step 4 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <h3 className="font-semibold text-blue-900">Run Database Setup</h3>
                  </div>
                  <ol className="ml-11 space-y-1 text-sm text-blue-800">
                    <li>In Supabase, go to <strong>SQL Editor</strong></li>
                    <li>Click <strong>"New Query"</strong></li>
                    <li>Open file: <code className="bg-white px-1 rounded text-xs">supabase/migrations/001_initial_schema.sql</code></li>
                    <li>Copy all content and paste into SQL editor</li>
                    <li>Click <strong>Run</strong> button</li>
                  </ol>
                </div>

                {/* Step 5 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                    <h3 className="font-semibold text-blue-900">Restart Dev Server</h3>
                  </div>
                  <div className="ml-11 text-sm text-blue-800">
                    <p>Close terminal and run:</p>
                    <div className="bg-white border border-gray-300 rounded p-3 font-mono text-xs mt-2">npm run dev</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">✨ After Setup, You'll Have:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">User Registration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">User Login</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Profile Management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Job Posting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Applications</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Notifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Dark Mode</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-sm text-gray-700">Real Database</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>📖 Need help?</strong> Check <code className="bg-white px-1 rounded text-xs">QUICK_START.md</code> or <code className="bg-white px-1 rounded text-xs">FULL_SETUP_GUIDE.md</code>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
