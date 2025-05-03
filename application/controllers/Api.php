<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Email_campaign_model');
    }

    // POST /email-campaign
    public function create()
    {
        $subject = $this->input->post('subject');
        $body = $this->input->post('body');
        $recipient_email = $this->input->post('recipient_email');

        if (!$subject || !$body || !$recipient_email) {
            return $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(['error' => 'All fields are required']));
        }

        $this->Email_campaign_model->create([
            'subject' => $subject,
            'body' => $body,
            'recipient_email' => $recipient_email,
            'status' => 'draft'
        ]);

        return $this->output
            ->set_content_type('application/json')
            ->set_status_header(201)
            ->set_output(json_encode(['message' => 'Campaign created successfully']));
    }

    // GET /email-campaigns
    public function get_all()
    {
        $campaigns = $this->Email_campaign_model->get_all();

        return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($campaigns));
    }

    // POST /email-campaign/{id}/send
    public function send($id)
    {
        $campaign = $this->Email_campaign_model->get_by_id($id);

        if (!$campaign) {
            return $this->output
                ->set_content_type('application/json')
                ->set_status_header(404)
                ->set_output(json_encode(['error' => 'Campaign not found']));
        }

        // Simulate email sending
        // mail($campaign->recipient_email, $campaign->subject, $campaign->body);

        $this->Email_campaign_model->mark_as_sent($id);

        return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode(['message' => 'Email sent and status updated']));
    }
}
