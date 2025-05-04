<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Run extends CI_Controller
{

    /**
     * This will migrate the table into db automatically.
     * or Create the table if it does not exist.
     * This is a one time run function.
     */
    public function index()
    {

        if (!$this->db->table_exists('email_campaigns')) {
            $this->db->query("CREATE TABLE `email_campaigns` (
                `id` INT(11) NOT NULL AUTO_INCREMENT,
                `subject` VARCHAR(255) NOT NULL,
                `body` TEXT NOT NULL,
                `recipient_email` VARCHAR(255) NOT NULL,
                `status` ENUM('draft', 'sent') DEFAULT 'draft',
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
        }


        redirect('/');
    }
}
