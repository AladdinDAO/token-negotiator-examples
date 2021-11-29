import { Overlay } from '@tokenscript/token-negotiator';
import { Outlet } from './dist/outlet/index';

// peronalise styles
import "./theme/style.css";
new Overlay();
new Outlet({ tokenName: 'devcon-ticket-local-3002' });

document.cookie = `dcTokens=[{"token":"MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"10593082611958123069159986522878346963005475009650354554005852930286854271222","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=10593082611958123069159986522878346963005475009650354554005852930286854271222&id=nicktaras@hotmail.co.uk"},{"token":"MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=","secret":"285996413010999512790264856198259265088323878963947294417758116344175800611","id":"nicktaras83@gmail.com","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=&secret=285996413010999512790264856198259265088323878963947294417758116344175800611&id=nicktaras83@gmail.com"},{"token":"MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"12719637406806243654230339844700051509369597731121204155497188964317169703492","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=12719637406806243654230339844700051509369597731121204155497188964317169703492&id=nicktaras@hotmail.co.uk"}]; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;`;

// Blocked by Safari.
// var x = JSON.stringify(localStorage.getItem('dcTokens')) + 'Hello';
// console.log('tokens parsed', x);
// localStorage.setItem('direct', localStorage.getItem('dcTokens'));
// localStorage.setItem('bb', x);
// localStorage.setItem('aa','Hello World');

// document.hasStorageAccess().then(access => {
//     if (access) {
//         console.log('Storage access was granted.');
//         document.cookie = `dcTokens=${localStorage.getItem('dcTokens')}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
//     } else {
//         // Show UX for no access.
//         console.log('Storage access was not granted.');
//     }
// });
// // @ts-ignore
// window['requestAS'] = function () {
//     document.requestStorageAccess();
// }
// document.body.innerHTML = `<button onclick="requestAS()" class="storage-access-btn-tn">Click Me</button>`;
