(function () {
  'use strict';

  var EXAMPLE = [
    '# 项目启动汇报',
    '- 2026年第三季度',
    '- 汇报人：产品团队',
    '',
    '# 背景与目标',
    '- 市场需求持续增长',
    '- 现有方案效率不足',
    '- 目标：3 个月内完成 MVP',
    '',
    '# 实施计划',
    '- 第一阶段：需求调研',
    '- 第二阶段：原型开发',
    '- 第三阶段：内测与上线',
    '',
    '# 谢谢',
    '- 欢迎提问',
  ].join('\n');

  var input = document.getElementById('outlineInput');
  var wrap = document.getElementById('slidesWrap');

  function parseOutline(text) {
    var blocks = text.split(/\n\s*\n/).map(function (b) { return b.trim(); }).filter(Boolean);
    return blocks.map(function (block) {
      var lines = block.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      if (!lines.length) return null;
      var title = lines[0].replace(/^#+\s*/, '');
      var bullets = lines.slice(1).map(function (l) { return l.replace(/^[-*]\s*/, ''); });
      return { title: title, bullets: bullets };
    }).filter(Boolean);
  }

  function render(slides) {
    wrap.innerHTML = '';
    slides.forEach(function (s, i) {
      var el = document.createElement('div');
      el.className = 'slide';
      var h2 = document.createElement('h2');
      h2.textContent = s.title;
      el.appendChild(h2);
      var ul = document.createElement('ul');
      s.bullets.forEach(function (b) {
        var li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });
      el.appendChild(ul);
      var num = document.createElement('span');
      num.className = 'slide__num';
      num.textContent = (i + 1) + ' / ' + slides.length;
      el.appendChild(num);
      wrap.appendChild(el);
    });
  }

  var currentSlides = [];

  function generate() {
    currentSlides = parseOutline(input.value);
    render(currentSlides);
  }

  function toMarp(slides) {
    var header = '---\nmarp: true\ntheme: default\npaginate: true\n---\n\n';
    var body = slides.map(function (s) {
      var lines = ['# ' + s.title, ''];
      s.bullets.forEach(function (b) { lines.push('- ' + b); });
      return lines.join('\n');
    }).join('\n\n---\n\n');
    return header + body + '\n';
  }

  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  document.getElementById('btnGenerate').addEventListener('click', generate);
  document.getElementById('btnExample').addEventListener('click', function () {
    input.value = EXAMPLE;
    generate();
  });
  document.getElementById('btnExportMd').addEventListener('click', function () {
    if (!currentSlides.length) return;
    var md = toMarp(currentSlides);
    download(new Blob([md], { type: 'text/markdown' }), 'slides.md');
  });

  input.value = EXAMPLE;
  generate();
})();
