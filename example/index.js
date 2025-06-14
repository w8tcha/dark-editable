import DarkEditable from '../dist/dark-editable';

const editable = document.querySelectorAll('.dark-edit');
let i = 0;
const edit_length = editable.length;

for (i = 0; i < edit_length; i++) {
	new DarkEditable(editable[i], { pos: 'bottom' });
}