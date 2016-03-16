import { target } from 'liquid-tether';

export default function() {
  this.transition(
    target('modal-dialog'),
    this.use('tether', 'fade', 'fade')
  );

  this.transition(
    target('folder-tree'),
    this.use('tether', ['fade-left', { duration: 400, easing: [600, 22] }])
  );
}
