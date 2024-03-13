<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]

# WbtDirectory

A directory of employees for West Bloomfield Township's town hall.

## About This Project

[![Directory Screenshot][directory-screenshot]](https://wbt-directory.web.app/)

I created this project as the IT department was using a PDF to keep track of and distribute the employee directory to the entire townhall staff. My main goals were to save time distributing the data to staff and to ensure accuracy, as people would occasionally refer to outdated PDFs saved locally rather than always using the most up-to-date version sent out when a new employee was added.

### Features:

* Allows users to search employees by first/last name, telephone number, or e-mail address.
* Separate tab for department fax numbers and to view employees by department.
* Admin panel which allows authenticated users to add, delete, and edit employees and their information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies

[![Angular][Angular.io]][Angular-url]
[![Firebase][Firebase-icon]][Firebase-url]
[![Angular Material UI][Material-icon]][Material-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Search input in the navigation bar allows users to search the list of all employees by first/last name, phone number, or e-mail. Login page for administrative users is accessed by clicking the lock icon at the very bottom-left corner of the page (scroll down). Once the user has been authenticated, an administrative panel option will be added to the radio buttons which will allow the user to edit existing, delete, and add new employees.

After editing or adding anyone to the directory, the application will fetch the updated data, allowing you to view any changes immediately.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Ethan McDowell - ethan.r.mcdowell@gmail.com

Live Project: https://wbt-directory.web.app/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[directory-screenshot]: ./src/assets/app-example.PNG
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Firebase-icon]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[Material-icon]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[Material-url]: https://material.angular.io/
