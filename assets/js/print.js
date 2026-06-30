/* ============================================================
   MyWellnessCalc — Print / PDF Save Script
   assets/js/print.js
   ============================================================ */

function saveAsPDF() {
  var resultEl = document.getElementById('result') || document.getElementById('resultSection');
  if (!resultEl || resultEl.offsetParent === null) {
    alert('Please calculate your result first, then save as PDF.');
    return;
  }

  var originalTitle = document.title;
  var toolName = document.body.getAttribute('data-tool-name') || document.title.split('–')[0].trim();
  var dateStr = new Date().toISOString().slice(0, 10);
  document.title = toolName.replace(/\s+/g, '-') + '-result-' + dateStr;

  window.print();

  document.title = originalTitle;
}

document.addEventListener('DOMContentLoaded', function () {
  var dateEls = document.querySelectorAll('.print-date');
  var today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  dateEls.forEach(function (el) { el.textContent = today; });
});
