import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 mb-4">
        Newsletter
      </h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Get the latest job opportunities and career tips delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 focus-within:border-violet-400 transition-colors">
          <EmailIcon className="text-slate-400" sx={{ fontSize: 18 }} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-sm placeholder:text-slate-400"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={subscribed}
          className="w-full px-4 py-2 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {subscribed ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 16 }} />
              Subscribed!
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
}