<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Email_campaign_model extends CI_Model
{
    // Create a new email campaign
    public function create($data)
    {
        return $this->db->insert('email_campaigns', $data);
    }
    // Get all email campaigns
    public function get_all()
    {
        return $this->db->get('email_campaigns')->result();
    }
    // Get one email campaign by ID
    public function get_by_id($id)
    {
        return $this->db->where('id', $id)->get('email_campaigns')->row();
    }
    // Update an email campaign
    public function mark_as_sent($id)
    {
        $campaign = $this->get_by_id($id);

        if (!$campaign) {
            return false;
        }
        //////this code is for sending email///////
        $this->load->config('email');

        $from_user = $this->config->item('smtp_user');
        // print_r($from_user);
        $this->email->from($from_user, 'Aiobc Test');
        $this->email->to($campaign->recipient_email);
        $this->email->subject($campaign->subject);
        $this->email->message($campaign->body);

        if ($this->email->send()) {
            return $this->db->where('id', $id)->update('email_campaigns', ['status' => 'sent']);
        } else {
            // print_r($this->email->print_debugger());
            return false;
        }
    }
}
