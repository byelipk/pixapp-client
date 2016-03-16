import { target } from 'liquid-tether';

export default function() {
  this.transition(
    target('modal-dialog'),
    this.use('tether', 'fade', 'fade')
  );
}
