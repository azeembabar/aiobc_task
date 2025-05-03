# aiobc_task

# 📧 CI3 Email Campaign

A lightweight RESTful API built with CodeIgniter 3 to manage email campaigns.

---

## 📦 Prerequisites

- PHP >= 7.2
- MySQL
- Apache
- Recommended local environments: Laragon, XAMPP, or WAMP

---

## ⚙️ Project Setup

### 1. Clone or Download the Repository

Copy or clone the project into the root directory of your web server.

```bash
# Example using Git
git clone https://github.com/azeembabar/aiobc_task.git
```

### 2. Configure Database

Create a database (e.g., `aiobc_db`) and update the database settings in:

**`application/config/database.php`**

```php
$db['default'] = array(
   	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => '',
	'database' => 'aiobc_db',
    'dbdriver' => 'mysqli',
    ...
);
```

Hit http://localhost/aiobc_task/run to run migrations

### 3. Other Configuration Settings

To set email smtp configuration go to email folder in application/config/email.php

```php
$config['useragent'] = 'phpmailer';
$config['mailpath']  = '/usr/bin/sendmail';
$config['protocol'] = 'smtp';
$config['smtp_host'] = ''; // smtp.example.com
$config['smtp_port'] = 465;
$config['smtp_user'] = '';
$config['smtp_pass'] = '';
$config['smtp_timeout'] = 30;
$config['smtp_crypto']  = 'ssl';                  //'ssl' or 'tls'.
   ...

```

Set base_url according to your requirements in application/config/config.php

```php

$config['base_url'] = 'http://localhost/aiobc_task/';

```
