const projects = [
  {
    title: '병원홈페이지 리뉴얼',
    tags: 'Web | 퍼블리싱 · SEO · PHP · 반응형',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    title: '문자팝',
    tags: 'Web | 디자인 · 퍼블리싱 · SEO · 유지보수',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    title: '뷰티 브랜드 랜딩페이지',
    tags: 'Landing Page | GSAP · 반응형',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
  },
  {
    title: '부동산 플랫폼 UI',
    tags: 'Web | React · TypeScript · Tailwind',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
  },
  {
    title: '이벤트 배너 시리즈',
    tags: 'Figma | UI/UX · 상세페이지 디자인',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)'
  },
  {
    title: '쇼핑몰 리뉴얼',
    tags: 'Web | Bootstrap · jQuery · 반응형',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)'
  }
];

function renderProjects() {
  const $grid = $('#work-grid');
  if (!$grid.length) return;

  const cards = projects.map(function(project) {
    return `
      <article class="project-card">
        <div class="project-thumb" style="background:${project.gradient}">
          <span>${project.title}</span>
        </div>
        <div class="project-info">
          <h2>${project.title}</h2>
          <p>${project.tags}</p>
        </div>
      </article>
    `;
  }).join('');

  $grid.html(cards);
}

$(renderProjects);
