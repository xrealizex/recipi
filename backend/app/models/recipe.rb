class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :title, length: { maximum: 30 }
  validates :category, presence: true
  validates :easiness, presence: true

  belongs_to :user
  has_many :favorites

  def self.search(keyword)
    http_client = HTTPClient.new
    url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426"
    query = {
      'keyword' => keyword,
      'applicationId' => ENV['RAKUTEN_APPID'],
      'result' => 'small',
      'formatVersion' => 2
    }
    response = http_client.get(url, query)
    p response
    if response.status == 200
      JSON.parse(response.body)['result']
    else
      []
    end
  end
end
