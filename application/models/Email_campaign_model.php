<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Email_campaign_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        return $this->db->insert('email_campaigns', $data);
    }

    public function get_all()
    {
        return $this->db->get('email_campaigns')->result();
    }

    public function get_by_id($id)
    {
        return $this->db->get_where('email_campaigns', ['id' => $id])->row();
    }

    public function mark_as_sent($id)
    {
        return $this->db->where('id', $id)->update('email_campaigns', ['status' => 'sent']);
    }
}
