class CreateRecipis < ActiveRecord::Migration[7.0]
  def change
    create_table :recipis do |t|
      t.string :title, limit: 30, null: false
      t.text :description
      t.string :category, null: false
      t.integer :easiness, null: false

      t.timestamps
    end
  end
end
