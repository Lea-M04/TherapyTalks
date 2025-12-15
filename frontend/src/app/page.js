"use client";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function Home() {
  const router = useRouter();
  return(
<>
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
  <div className="max-w-7xl mx-auto text-center mb-12">
    <h1 className="text-4xl md:text-6xl font-bold font-onest text-primary-purple mb-4">
      Welcome to TherapyTalks
    </h1>
    <p className="mt-4 text-lg md:text-xl font-tiktok text-primary-dark">
      Your mental health matters. Start your journey to emotional well-being today.
    </p>
   
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        onClick={() => router.push("/auth/register")}
        variant="secondary"
        className="bg-primary-pink text-white px-8 py-3 rounded-lg hover:bg-primary-pink-hover transition-colors font-onest font-semibold"
      >
        Start Your Journey
      </Button>
      
      <button
        onClick={() => router.push("/auth/login")}
        className="bg-primary-purple text-white px-8 py-3 rounded-lg hover:bg-primary-purple-hover transition-colors font-onest font-semibold"
      >
        Returning? Login
      </button>
    </div>
  </div>

  <div className="max-w-7xl mx-auto">
 
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-border">
      <h2 className="text-3xl font-bold font-onest text-primary-dark mb-6 text-center">
        How to Maintain Your Mental Health
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-pink rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Practice Self-Care</h3>
          <p className="text-primary-dark">
            Regular sleep, balanced nutrition, and physical activity form the foundation of mental well-being. 
            Prioritize activities that recharge you.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Build Connections</h3>
          <p className="text-primary-dark">
            Maintain meaningful relationships. Social support is crucial for emotional resilience 
            and provides a buffer against stress.
          </p>
        </div>
       
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-pink rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Manage Stress</h3>
          <p className="text-primary-dark">
            Incorporate mindfulness, meditation, or breathing exercises. Learn to identify 
            stress triggers and develop healthy coping strategies.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">4</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Set Boundaries</h3>
          <p className="text-primary-dark">
            Learn to say no and establish healthy limits in relationships and work. 
            Protect your energy and emotional space.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-pink rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">5</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Seek Professional Help</h3>
          <p className="text-primary-dark">
            Therapy is a sign of strength, not weakness. Professional guidance can provide 
            tools and perspectives for lasting change.
          </p>
        </div>
      
        <div className="bg-gradient-to-br from-gray-50 to-primary/10 p-6 rounded-xl border border-border">
          <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">6</span>
          </div>
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Practice Gratitude</h3>
          <p className="text-primary-dark">
            Keep a gratitude journal or regularly acknowledge positive aspects of life. 
            This rewires the brain to focus on positives.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-primary-purple/10 to-primary-pink/10 rounded-2xl p-10 md:p-8 mb-8">
      <h2 className="text-3xl font-bold font-onest text-primary-dark mb-6 text-center">
        Why Choose TherapyTalks
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/80 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Safe & Confidential</h3>
          <p className="text-primary-dark">
            Your privacy is our priority. All sessions and data are encrypted and protected 
            with the highest security standards.
          </p>
        </div>
        
        <div className="bg-white/80 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold font-onest text-primary-purple mb-3">Licensed Professionals</h3>
          <p className="text-primary-dark">
            Connect with certified therapists and counselors specialized in various 
            mental health areas.
          </p>
        </div>
      </div>
    </div>

    <div className="text-center mb-8 p-10">
      <h2 className="text-3xl font-bold font-onest text-primary-dark mb-4">
        Free Mental Health Resources
      </h2>
      <p className="text-lg text-primary-dark mb-6">
        Access articles, guided meditations, and self-help tools
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => router.push("/resources/articles")}
          className="px-6 py-3 bg-white border-2 border-primary-pink text-primary-purple rounded-lg hover:bg-primary-pink/10 transition-colors font-onest font-semibold"
        >
          📚 Articles
        </button>
        <button 
          onClick={() => router.push("/resources/meditations")}
          className="px-6 py-3 bg-white border-2 border-primary-pink text-primary-purple rounded-lg hover:bg-primary-pink/10 transition-colors font-onest font-semibold"
        >
          🧘 Guided Meditations
        </button>
        <button 
          onClick={() => router.push("/resources/tools")}
          className="px-6 py-3 bg-white border-2 border-primary-pink text-primary-purple rounded-lg hover:bg-primary-pink/10 transition-colors font-onest font-semibold"
        >
          🛠️ Self-Help Tools
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-primary-pink text-white p-4 rounded-xl text-center">
        <div className="text-2xl font-bold font-onest">95%</div>
        <div className="text-sm">User Satisfaction</div>
      </div>
      <div className="bg-primary-purple text-white p-4 rounded-xl text-center">
        <div className="text-2xl font-bold font-onest">24/7</div>
        <div className="text-sm">Support Available</div>
      </div>
      <div className="bg-primary-dark text-white p-4 rounded-xl text-center">
        <div className="text-2xl font-bold font-onest">50+</div>
        <div className="text-sm">Licensed Therapists</div>
      </div>
      <div className="bg-primary text-white p-4 rounded-xl text-center">
        <div className="text-2xl font-bold font-onest">10K+</div>
        <div className="text-sm">Sessions Completed</div>
      </div>
    </div>

    <div className="text-center">
      <p className="text-lg text-primary-dark mb-6">
        Take the first step toward better mental health today. It's okay to ask for help.
      </p>
      <Button
        onClick={() => router.push("/professionals")}
        className="bg-gradient-to-r from-primary-purple to-primary-pink text-white px-10 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg font-onest font-bold shadow-lg"
      >
        Begin Your Healing Journey
      </Button>
      
     
    </div>
  </div>
</div>
</>
  );
}