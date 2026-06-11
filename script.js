document.addEventListener('DOMContentLoaded', () => {
    const fileItems = document.querySelectorAll('.file-item');
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.file-content');

    function switchFile(fileId) {
        // Update sidebar
        fileItems.forEach(item => {
            item.classList.toggle('active', item.dataset.file === fileId);
        });

        // Update tabs
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.id === `tab-${fileId}`);
        });

        // Update content
        contents.forEach(content => {
            content.classList.toggle('active', content.id === fileId);
        });
    }

    fileItems.forEach(item => {
        item.addEventListener('click', () => {
            switchFile(item.dataset.file);
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const fileId = tab.id.replace('tab-', '');
            switchFile(fileId);
        });
    });

    // Generate line numbers
    function updateLineNumbers() {
        const activeContent = document.querySelector('.file-content.active');
        const lineNumbersContainer = document.querySelector('.line-numbers');
        const lines = activeContent.querySelectorAll('p').length;
        
        lineNumbersContainer.innerHTML = '';
        for (let i = 1; i <= lines; i++) {
            const div = document.createElement('div');
            div.textContent = i;
            lineNumbersContainer.appendChild(div);
        }
    }

    // Initial line numbers
    updateLineNumbers();

    // Update line numbers when switching files
    const observer = new MutationObserver(() => {
        updateLineNumbers();
    });
    
    observer.observe(document.querySelector('.content'), { 
        childList: true, 
        subtree: true, 
        attributes: true 
    });

    // Since we just toggle 'active' class, we need to manually trigger update
    fileItems.forEach(item => {
        item.addEventListener('click', updateLineNumbers);
    });
    tabs.forEach(tab => {
        tab.addEventListener('click', updateLineNumbers);
    });
});
