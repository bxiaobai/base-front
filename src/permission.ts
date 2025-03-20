import 'nprogress/nprogress.css'; // progress bar style
import NProgress from 'nprogress';
import router from '@/router'
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  NProgress.done();
  next();
});

router.afterEach((to) => {
  NProgress.done();
});
