const projects = [
  {
    title: '병원홈페이지 리뉴얼',
    tags: 'Web | 퍼블리싱 · SEO · PHP · 반응형',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    thumb: './assets/img/works/hospital-renewal-thumb.jpg',
    detailId: 'project-detail-hospital'
  },
  {
    title: 'TOCK 랜딩페이지',
    tags: 'Landing Page | HTML · CSS · Swiper · AOS · 반응형',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    thumb: './works/landing/assets/images/kv-image.png',
    detailId: 'project-detail-landing'
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

function renderThumb(project) {
  if (project.thumb) {
    return `<img src="${project.thumb}" alt="${project.title} 썸네일" class="project-thumb-img">`;
  }

  return `<span>${project.title}</span>`;
}

function renderProjects() {
  const $grid = $('#work-grid');
  if (!$grid.length) return;

  const cards = projects.map(function(project, index) {
    const detailAttr = project.detailId ? ` data-detail-id="${project.detailId}"` : '';

    return `
      <article class="project-card"${detailAttr} data-project-index="${index}">
        <div class="project-thumb" style="background:${project.gradient}">
          ${renderThumb(project)}
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

const LANDING_DEVICES = {
  pc: { width: 1280, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

let currentLandingDevice = 'pc';

function fitLandingMockup() {
  const mockup = document.getElementById('landing-mockup');
  const screen = mockup && mockup.querySelector('.mockup-screen');
  const iframe = document.getElementById('landing-preview-iframe');
  if (!screen || !iframe) return;

  const preset = LANDING_DEVICES[currentLandingDevice];
  const scale = screen.clientWidth / preset.width;

  iframe.style.width = preset.width + 'px';
  iframe.style.height = preset.height + 'px';
  iframe.style.transform = 'scale(' + scale + ')';
  screen.style.height = Math.round(preset.height * scale) + 'px';
}

function setLandingDevice(device) {
  const mockup = document.getElementById('landing-mockup');
  if (!mockup || !LANDING_DEVICES[device]) return;

  currentLandingDevice = device;
  mockup.className = 'device-mockup mockup-' + device;

  $('.device-switch')
    .removeClass('is-active')
    .attr('aria-selected', 'false');
  $('.device-switch[data-device="' + device + '"]')
    .addClass('is-active')
    .attr('aria-selected', 'true');

  requestAnimationFrame(fitLandingMockup);
  setTimeout(fitLandingMockup, 460);
}

function initLandingPreview() {
  setLandingDevice('pc');
}

function showProjectList() {
  $('.work-header, #work-grid').show();
  $('.project-detail').attr('hidden', true);
}

function showProjectDetail(detailId) {
  $('.work-header, #work-grid').hide();
  $('.project-detail').attr('hidden', true);
  $('#' + detailId).removeAttr('hidden');
  $('#window-work .fullwin-content').scrollTop(0);

  if (detailId === 'project-detail-landing') {
    requestAnimationFrame(initLandingPreview);
  }
}

window.showProjectList = showProjectList;

$(function() {
  renderProjects();

  $('#work-grid').on('click', '.project-card[data-detail-id]', function() {
    showProjectDetail($(this).data('detail-id'));
  });

  $('.project-detail-back').on('click', showProjectList);

  $('.device-switch').on('click', function() {
    setLandingDevice($(this).data('device'));
  });

  $(window).on('resize', function() {
    if (!$('#project-detail-landing').is('[hidden]')) {
      fitLandingMockup();
    }
  });
});
