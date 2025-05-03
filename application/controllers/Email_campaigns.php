<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Email_campaigns extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Email_campaign_model');
    }

    //  POST/GET email_campaigns
    public function email_campaign()
    {

        if ($this->input->post()) {

            $subject = $this->input->post('subject');
            $body = $this->input->post('body');
            $recipient_email = $this->input->post('recipient_email');

            if (!$subject || !$body || !$recipient_email) {
                echo json_encode(['error' => 'All fields are required']);
                die;
            }

            $data = ['subject' => $subject, 'body' => $body, 'recipient_email' => $recipient_email, 'status' => 'draft'];

            $this->Email_campaign_model->create($data);

            $campaigns = $this->Email_campaign_model->get_all();

            echo json_encode(['message' => 'Campaign created successfully']);
            die;
        }


        $campaigns = $this->Email_campaign_model->get_all();
        echo json_encode($campaigns);
        die;
    }

    // POST {id}/send
    public function send($id)
    {
        $campaign = $this->Email_campaign_model->get_by_id($id);

        if (!$campaign) {
            echo json_encode(['error' => 'Campaign not found']);
            die;
        };

        if ($this->Email_campaign_model->mark_as_sent($id)) {

            $campaign = $this->Email_campaign_model->get_by_id($id);
            echo json_encode(['message' => 'Email sent and status updated']);
        } else {
            echo json_encode(['error' => 'Failed to send email']);
        }
        die;
    }
}
