document.addEventListener("DOMContentLoaded", function () {

const input   = document.getElementById('topicInput');
const btn     = document.getElementById('studyBtn');
const btnLabel = document.getElementById('btnLabel');
const loader  = document.getElementById('loader');
const errorBox = document.getElementById('errorBox');
const errorMsg = document.getElementById('errorMsg');
const results = document.getElementById('results');


// Allow Enter key
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchStudy();
});


// Set topic
window.setTopic = function(topic) {
  input.value = topic;
  input.focus();
  fetchStudy();
}


// Toggle loading
function setLoading(on) {
  loader.classList.toggle('active', on);
  btn.disabled = on;
  btnLabel.textContent = on ? 'Loading…' : 'Explain →';
}


// Show error
function showError(msg) {
  errorBox.classList.add('active');
  errorMsg.textContent = msg;
  results.classList.remove('active');
}

function hideError() {
  errorBox.classList.remove('active');
}


// Fetch API
window.fetchStudy = async function() {

  const topic = input.value.trim();

  if (!topic) {
    input.focus();
    return;
  }

  hideError();
  results.classList.remove('active');
  setLoading(true);

  try {

    const res = await fetch('/study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error || 'Request failed.');
    }

    renderResults(data);

  } catch (err) {
    showError(err.message || 'Unable to reach the server.');
  } finally {
    setLoading(false);
  }

}


// Render results
function renderResults(data) {

  document.getElementById('resultTopic').textContent = data.topic;

  document.getElementById('resultTime').textContent =
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById('simpleExplanation').textContent = data.simple_explanation;


  const kpList = document.getElementById('keyPoints');
  kpList.innerHTML = '';

  (data.key_points || []).forEach(point => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="kp-dot"></span><span>${point}</span>`;
    kpList.appendChild(li);
  });


  const iqList = document.getElementById('interviewQuestions');
  iqList.innerHTML = '';

  (data.interview_questions || []).forEach((q, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="iq-num">Q${i + 1}</span><span>${q}</span>`;
    iqList.appendChild(li);
  });


  document.getElementById('realWorldExample').textContent = data.real_world_example;

  results.classList.add('active');

  results.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

}

});