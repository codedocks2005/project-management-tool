<template>
  <div class="app">
    <header class="header">
      <nav class="nav" aria-label="Main navigation">
        <span tabindex="0">Home</span>
        <span tabindex="0">Boards</span>
      </nav>
      <div class="search">
        <input type="text" placeholder="Search" aria-label="Search cards or lists" />
      </div>
    </header>

    <main class="board" aria-label="Kanban board">
      <div v-for="list in lists" :key="list.id" class="list" role="region" :aria-label="list.name">
        <div class="list-header">{{ list.name }}</div>

        <div v-for="card in list.cards" :key="card.id" class="card" role="article" :aria-label="card.name">
          <div class="card-title">{{ card.name }}</div>
          <div class="card-content">{{ card.content }}</div>
          <div class="card-footer">
            <span>{{ card.date }}</span>
            <span class="details-icon" tabindex="0" role="button" aria-label="Card details">...</span>
          </div>
        </div>

        <button class="create-card" @click="addCard(list.id)" aria-label="Create new card in {{ list.name }}">
          + Create New Card
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:3001/api/kanban', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load Kanban');

      this.lists = data.lists;
    } catch (err) {
      alert('Error loading Kanban: ' + err.message);
    }
  },
  methods: {
    addCard(listId) {
      const list = this.lists.find(l => l.id === listId);
      if (list) {
        list.cards.push({
          id: Date.now(),
          name: 'New Card',
          content: 'New content',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
      }
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: #6a1b9a;
  padding: 25px;
  color: white;
  font-size: 25px;
  flex-wrap: wrap;
  gap: 10px;
}

.nav span {
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
}

.search input {
  padding: 15px;
  font-size: 16px;
  border-radius: 3px;
  border: none;
  width: 250px;
}

.board {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.list {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  width: 450px;
  box-sizing: border-box;
  transition: transform 0.2s;
}
.list:hover {
  transform: translateY(-3px);
}

.list-header {
  background-color: #6a1b9a;
  color: white;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}

.card {
  background-color: white;
  padding: 18px;
  margin: 12px 0;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-weight: bold;
  font-size: 20px;
}

.card-content {
  margin: 10px 0;
  font-size: 18px;
  color: #444;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
}

.details-icon {
  cursor: pointer;
  user-select: none;
  padding: 0 6px;
  font-weight: bold;
}

.create-card {
  background-color: #7e57c2;
  color: white;
  border: none;
  padding: 14px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.2s ease;
}
.create-card:hover {
  background-color: #9575cd;
}

@media (max-width: 768px) {
  .board {
    flex-direction: column;
    align-items: center;
  }

  .list {
    width: 90%;
  }
}
</style>
