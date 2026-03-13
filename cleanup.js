const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove buggy duplicated font and blur classes
    content = content.replace(/text-black font-semibold tracking-wide( font-semibold tracking-wide)+/g, 'text-slate-900 font-medium');
    content = content.replace(/text-black font-semibold tracking-wide/g, 'text-slate-900 font-medium');
    content = content.replace(/(backdrop-blur-\w+)( \1)+/g, '$1');
    content = content.replace(/backdrop-blur-3xl backdrop-blur-2xl/g, 'backdrop-blur-md');
    content = content.replace(/backdrop-blur-2xl backdrop-blur-3xl/g, 'backdrop-blur-md');
    content = content.replace(/backdrop-blur-xl backdrop-blur-md/g, 'backdrop-blur-md');
    content = content.replace(/backdrop-blur-(2|3)xl/g, 'backdrop-blur-xl');
    content = content.replace(/(bg-white\/[0-9]{2})( \1)+/g, '$1');

    // Boost contrast for remaining light text colors on light background
    content = content.replace(/text-white/g, 'text-slate-900');
    content = content.replace(/text-indigo-200(\/80|\/60)?/g, 'text-slate-700');
    content = content.replace(/text-indigo-300(\/50)?/g, 'text-slate-600');
    content = content.replace(/text-indigo-400/g, 'text-indigo-700 font-semibold');
    content = content.replace(/text-purple-400/g, 'text-purple-700 font-semibold');
    content = content.replace(/text-purple-200/g, 'text-purple-800');
    content = content.replace(/text-slate-200/g, 'text-slate-800');
    content = content.replace(/text-green-200/g, 'text-green-800 font-semibold');
    content = content.replace(/text-red-200/g, 'text-red-800 font-semibold');
    content = content.replace(/text-indigo-800\/40/g, 'text-slate-600');
    content = content.replace(/text-amber-400/g, 'text-amber-700 font-semibold');
    content = content.replace(/text-red-400/g, 'text-red-700 font-semibold');

    // Fix buttons that might have been washed out
    content = content.replace(/bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg/g, 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg');
    content = content.replace(/className="px-4 py-2 bg-white\/95/g, 'className="px-4 py-2 bg-white text-slate-900');

    // Deduplicate any classes inside className="..."
    content = content.replace(/className="([^"]+)"/g, (match, p1) => {
        const classes = p1.split(/\s+/).filter(Boolean);
        const uniqueClasses = [...new Set(classes)];
        return `className="${uniqueClasses.join(' ')}"`;
    });

    fs.writeFileSync(file, content);
});

console.log('Cleanup script finished.');
