//your JS code here. If required.
const output = document.getElementById('output');

    // Create a function that returns a promise which resolves in random 1-3 seconds
    function createTimedPromise(index) {
      const delay = Math.random() * 2 + 1; // 1 to 3 seconds
      return new Promise(resolve => {
        const start = performance.now();
        setTimeout(() => {
          const end = performance.now();
          const timeTaken = ((end - start) / 1000).toFixed(3); // in seconds
          resolve({ index, time: timeTaken, delay: delay });
        }, delay * 1000);
      });
    }

    // Track when all promises start
    const startTime = performance.now();

    // Create three promises
    const promises = [1, 2, 3].map(i => createTimedPromise(i));

    Promise.all(promises).then(results => {
      const endTime = performance.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(3);

      // Clear the loading row
      output.innerHTML = '';

      // Populate the resolved promises
      results.sort((a, b) => a.index - b.index).forEach((result, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>Promise ${i + 1}</td><td>${result.time}</td>`;
        output.appendChild(row);
      });

      // Add total row
      const totalRow = document.createElement('tr');
      totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
      output.appendChild(totalRow);
    });